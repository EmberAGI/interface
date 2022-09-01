import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import { ERC20_ABI } from '../../legacy/constants/abis/erc20';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';
import { useActiveWeb3React } from '../../legacy/hooks';

export interface UserApprovedAmount {
  approvedAmount: string;
}

const initialFarmStats = {
  approvedAmount: '10',
};

export default function useERC20Contract(contractAddress: string) {
  const { library, account } = useActiveWeb3React();
  // Users approved amount
  const [approvedAmount, setApprovedAmount] = useState<UserApprovedAmount>(initialFarmStats);
  //Farm (StakingRewards) contract under farmContract
  const [farmContract, setFarmContract] = useState<ethers.Contract>(
    new ethers.Contract(contractAddress, farmingContractABI, library)
  );
  //Contract that is being staked
  const [erc20Contract, setErc20Contract] = useState<ethers.Contract>();

  //Upon change on contractAddress or Library creates new instance of  StakingRewards contract.
  useEffect(() => {
    setFarmContract(new ethers.Contract(contractAddress, farmingContractABI, library));
  }, [contractAddress, library]);

  // Fetch the contract that is being staked and store it on erc20Contract
  useEffect(() => {
    farmContract
      .stakingToken()
      .then((stakingTokenAddress: string) => {
        setErc20Contract(new ethers.Contract(stakingTokenAddress, ERC20_ABI, library));
      })
      .catch((error: any) => console.error(error));
  }, [farmContract, library]);

  // Check the allowance amount the user has given the StakingRewards contract and set it on the Approved amount
  const checkUsersAllowance = async () => {
    const userAllowance: BigNumber = await erc20Contract
      .allowance(account, contractAddress)
      .then((value: number) => BigNumber.from(value));
    return userAllowance;
  };

  // Check to see if user has to approve more funds based on how much the user is trying to stake
  // stakingAmountDesired comes fron the frontend
  const isMoreApprovalNecesary = async (stakingAmountDesired: string) => {
    const stkAmountDesired = Number(stakingAmountDesired);
    const userAllowance = await checkUsersAllowance();
    const necesary = stkAmountDesired * 10 ** 18 > userAllowance ? true : false;
  };

  useEffect(() => {
    if (erc20Contract == undefined) {
      return;
    }
    let isSubscribed = true;
    const unsubscribeFunctions: (() => ethers.Contract)[] = [];

    const updateFarmStats = async () => {
      const rewardsDuration: BigNumber = await farmContract
        .rewardsDuration()
        .then((value: number) => BigNumber.from(value));
      const rewardsForDuration: BigNumber = await farmContract
        .getRewardForDuration()
        .then((value: number) => BigNumber.from(value));
      const stakeBalance: BigNumber = await farmContract.totalSupply().then((value: number) => BigNumber.from(value));
      const newAPR = calculateAPR(rewardsDuration, rewardsForDuration, stakeBalance);
      const stakingTokenDecimals = await stakingTokenContract.decimals();

      if (isSubscribed) {
        setFarmStats({
          tvl: formatUnits(stakeBalance, stakingTokenDecimals).toString(),
          apr: newAPR.toString(),
          dailyROI: (newAPR / daysPerYear).toString(),
        });
      }
    };
    updateFarmStats();

    if (!isSubscribed) {
      return;
    }

    const listener = async () => {
      await updateFarmStats();
    };
    const toStakingTokenFilter = stakingTokenContract.filters.Transfer(null, contractAddress);
    stakingTokenContract.on(toStakingTokenFilter, listener);
    unsubscribeFunctions.push(() => stakingTokenContract.off(toStakingTokenFilter, listener));
    const fromStakingTokenFilter = stakingTokenContract.filters.Transfer(contractAddress);
    stakingTokenContract.on(fromStakingTokenFilter, listener);
    unsubscribeFunctions.push(() => stakingTokenContract.off(fromStakingTokenFilter, listener));

    return () => {
      isSubscribed = false;
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [contractAddress, farmContract, library, stakingTokenContract]);

  return farmStats;
}
