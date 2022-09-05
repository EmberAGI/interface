import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import { ERC20_ABI } from '../../../legacy/constants/abis/erc20';
import farmingContractABI from '../../../legacy/constants/abis/farmingContract.json';
import { useActiveWeb3React } from '../../../legacy/hooks';

export interface YieldFarmStats {
  tvl: string;
  apr: string;
  dailyROI: string;
}

const initialFarmStats = {
  tvl: '50000',
  apr: '420',
  dailyROI: '35',
};

export default function useYieldFarmStatsViewModel(contractAddress: string) {
  const { library } = useActiveWeb3React();
  const [farmStats, setFarmStats] = useState<YieldFarmStats>(initialFarmStats);
  const [farmContract, setFarmContract] = useState<ethers.Contract>(
    new ethers.Contract(contractAddress, farmingContractABI, library)
  );
  const [stakingTokenContract, setStakingTokenContract] = useState<ethers.Contract>();

  useEffect(() => {
    setFarmContract(new ethers.Contract(contractAddress, farmingContractABI, library));
  }, [contractAddress, library]);

  useEffect(() => {
    farmContract
      .stakingToken()
      .then((stakingTokenAddress: string) => {
        setStakingTokenContract(new ethers.Contract(stakingTokenAddress, ERC20_ABI, library));
      })
      .catch((error: any) => console.error(error));
  }, [farmContract, library]);

  useEffect(() => {
    if (stakingTokenContract == undefined) {
      return;
    }
    let isSubscribed = true;
    const unsubscribeFunctions: (() => ethers.Contract)[] = [];
    const daysPerYear = 365;
    const calculateAPR = (
      rewardsDurationSeconds: BigNumber,
      rewardsForDuration: BigNumber,
      stakeBalance: BigNumber
    ) => {
      const secondsPerDay = BigNumber.from(86400);
      const secondsPerYear = secondsPerDay.mul(daysPerYear);
      const annualRewardPeriods = BigNumber.from(secondsPerYear).div(rewardsDurationSeconds);
      const annualRewards = rewardsForDuration.mul(annualRewardPeriods);
      const apr = annualRewards.div(stakeBalance).mul(100).toNumber();
      return apr;
    };
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
