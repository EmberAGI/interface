import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useActiveWeb3React } from '../../legacy/hooks';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';
import { ERC20_ABI } from '../../legacy/constants/abis/erc20';
import { formatUnits } from 'ethers/lib/utils';
import { YieldFarmStats } from './useYieldFarmStats';

export interface LpTokenUserPosition {
  userBalance: string;
  userDeposited: string;
}

export interface YieldFarm {
  contractAddress: string;
  //stakingTokenName: string;
  //farmStats: YieldFarmStats;
  //userPosition: LpTokenUserPosition;
}

export interface YieldFarmViewModel {
  yieldFarms: YieldFarm[];
}

const initialViewModel = {
  yieldFarms: [
    {
      contractAddress: '0xE66240fD326ac1f263727C52c69F8dcDE6c5147B',
      /*stakingTokenName: 'AMB-wUSDC-flp',
      farmStats: {
        tvl: '50000',
        apr: '420',
        dailyROI: '35',
      },
      userPosition: {
        userBalance: '5',
        userDeposited: '1',
      },*/
    },
  ],
};

export default function useYieldFarmViewModel() {
  const { library } = useActiveWeb3React();
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const [farmContracts, setFarmContracts] = useState<string[]>();

  useEffect(() => {
    // Get farm contract list from library
    const farmList = ['0xE66240fD326ac1f263727C52c69F8dcDE6c5147B'];

    setFarmContracts(farmList);
    setViewModel({
      yieldFarms: [{ contractAddress: '0xE66240fD326ac1f263727C52c69F8dcDE6c5147B' }],
    });
  }, []);

  /*useEffect(() => {
    let isSubscribed = true;
    const unsubscribeFunctions: (() => ethers.Contract)[] = [];
    farmContracts?.forEach(async (address) => {
      if (!isSubscribed) {
        return;
      }

      setViewModel((viewModel) => {
        console.log(`viewModel: ${JSON.stringify(viewModel)}`);
        const viewModelUpdate = {
          ...viewModel,
          yieldFarms: viewModel.yieldFarms.map((yieldFarm) => {
            if (yieldFarm.stakingTokenName != stakingTokenName) {
              return yieldFarm;
            }

            return {
              ...yieldFarm,
              farmStats: {
                tvl: formatUnits(stakeBalance, stakingTokenDecimals).toString(),
                apr: newAPR.toString(),
                dailyROI: (newAPR / daysPerYear).toString(),
              },
            };
          }),
        };
        console.log(`viewModelUpdate: ${JSON.stringify(viewModelUpdate)}`);
        return viewModelUpdate;
      });

      /*
      // DEBUG
      console.log(`farmContracts?.forEach(${address} => ... )`);

      if (!isSubscribed) {
        return;
      }

      const farmContract = new ethers.Contract(address, farmingContractABI, library);
      // DEBUG
      console.log(`farmContract: ${farmContract}`);
      const stakingTokenAddress: string = await farmContract.stakingToken();
      // DEBUG
      console.log(`stakingTokenAddress: ${stakingTokenAddress}`);
      const stakingTokenContract: ethers.Contract = new ethers.Contract(stakingTokenAddress, ERC20_ABI, library);
      // DEBUG
      console.log(`stakingTokenContract: ${stakingTokenContract}`);
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
        // DEBUG
        console.log(`annualRewards: ${annualRewards}`);
        const apr = annualRewards.div(stakeBalance).mul(100).toNumber();
        return apr;
      };
      const updateFarmStats = async () => {
        const rewardsDuration: BigNumber = await farmContract
          .rewardsDuration()
          .then((value: number) => BigNumber.from(value));
        // DEBUG
        console.log(`rewardsDuration: ${rewardsDuration}`);
        const rewardsForDuration: BigNumber = await farmContract
          .getRewardForDuration()
          .then((value: number) => BigNumber.from(value));
        // DEBUG
        console.log(`rewardsForDuration: ${rewardsForDuration}`);
        const stakeBalance: BigNumber = await farmContract.totalSupply().then((value: number) => BigNumber.from(value));
        const newAPR = calculateAPR(rewardsDuration, rewardsForDuration, stakeBalance);

        const stakingTokenName = await stakingTokenContract.name();
        // DEBUG
        console.log(`stakingTokenName: ${stakingTokenName}`);
        const stakingTokenDecimals = await stakingTokenContract.decimals();
        // DEBUG
        console.log(`stakingTokenDecimals: ${stakingTokenDecimals}`);

        setViewModel((viewModel) => {
          console.log(`viewModel: ${JSON.stringify(viewModel)}`);
          const viewModelUpdate = {
            ...viewModel,
            yieldFarms: viewModel.yieldFarms.map((yieldFarm) => {
              if (yieldFarm.stakingTokenName != stakingTokenName) {
                return yieldFarm;
              }

              return {
                ...yieldFarm,
                farmStats: {
                  tvl: formatUnits(stakeBalance, stakingTokenDecimals).toString(),
                  apr: newAPR.toString(),
                  dailyROI: (newAPR / daysPerYear).toString(),
                },
              };
            }),
          };
          console.log(`viewModelUpdate: ${JSON.stringify(viewModelUpdate)}`);
          return viewModelUpdate;
        });
      };
      await updateFarmStats();

      if (!isSubscribed) {
        return;
      }

      const listener = async () => {
        await updateFarmStats();
      };
      const toStakingTokenFilter = stakingTokenContract.filters.Transfer(null, address);
      // DEBUG
      console.log(`filter: ${toStakingTokenFilter}`);
      stakingTokenContract.on(toStakingTokenFilter, listener);
      unsubscribeFunctions.push(() => stakingTokenContract.off(toStakingTokenFilter, listener));
      const fromStakingTokenFilter = stakingTokenContract.filters.Transfer(address);
      // DEBUG
      console.log(`filter: ${fromStakingTokenFilter}`);
      stakingTokenContract.on(fromStakingTokenFilter, listener);
      unsubscribeFunctions.push(() => stakingTokenContract.off(fromStakingTokenFilter, listener));
      
    });

    return () => {
      isSubscribed = false;
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [farmContracts, library]);*/

  const getLpToken = (token: string) => {
    console.log('getLpToken');
  };

  const manageLpToken = (token: string) => {
    console.log('manageLpToken');
  };

  const approveLpToken = (token: string) => {
    console.log('approveLpToken');
  };

  const depositLpToken = (token: string, amount: string) => {
    console.log('depositLpToken');
  };

  const withdrawLpToken = (token: string, amount: string) => {
    console.log('withdrawLpToken');
  };

  return {
    viewModel,
    getLpToken,
    manageLpToken,
    approveLpToken,
    depositLpToken,
    withdrawLpToken,
  };
}
