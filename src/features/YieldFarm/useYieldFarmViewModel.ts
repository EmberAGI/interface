import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useActiveWeb3React } from '../../legacy/hooks';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';

export interface YieldFarmStats {
  tvl: string;
  apr: string;
  dailyROI: string;
}

export interface LpTokenUserPosition {
  userBalance: string;
  userDeposited: string;
}

export interface YieldFarm {
  stakingTokenName: string;
  farmStats: YieldFarmStats;
  userPosition: LpTokenUserPosition;
}

export type YieldFarmViewModel = YieldFarm[] | undefined;

export default function useYieldFarmViewModel() {
  const { library } = useActiveWeb3React();
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>();
  const [farmContracts, setFarmContracts] = useState<string[]>();

  //DEBUG
  useEffect(() => {
    setViewModel([
      {
        stakingTokenName: 'AMB-wUSDC-flp',
        farmStats: {
          tvl: '50000',
          apr: '420',
          dailyROI: '35',
        },
        userPosition: {
          userBalance: '5',
          userDeposited: '1',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    // Get farm contract list from library
    const farmList = ['0xE66240fD326ac1f263727C52c69F8dcDE6c5147B'];

    setFarmContracts(farmList);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribeFunctions: (() => ethers.Contract)[] = [];
    farmContracts?.forEach(async (address) => {
      if (!isSubscribed) {
        return;
      }

      const farmContract = new ethers.Contract(address, farmingContractABI);
      const stakingTokenContract: ethers.Contract = await farmContract.stakingToken();
      const filter = stakingTokenContract.filters.Transfer(null, address);
      const updateAPR = async () => {
        // DEBUG
        console.log('calculate & update APR...');

        const rewardsForDuration = await farmContract.getRewardForDuration();
        const rewardsDuration = await farmContract.rewardsDuration();
        const annualRewardPeriods = 365 / rewardsDuration;
        const annualRewards = rewardsForDuration * annualRewardPeriods;
        const stakeBalance = await farmContract.totalSupply();
        const apr = (annualRewards / stakeBalance) * 100;
        const stakingTokenName = await stakingTokenContract.name();
        const viewModelUpdate = viewModel?.map((yieldFarm) => {
          if (yieldFarm.stakingTokenName != stakingTokenName) {
            return yieldFarm;
          }

          return {
            ...yieldFarm,
            farmStats: {
              ...yieldFarm.farmStats,
              apr: apr.toString(),
            },
          };
        });
        setViewModel(viewModelUpdate);
      };
      await updateAPR();

      if (!isSubscribed) {
        return;
      }

      const listener = async () => {
        await updateAPR();
      };
      stakingTokenContract.on(filter, listener);
      unsubscribeFunctions.push(() => stakingTokenContract.off(filter, listener));
    });

    return () => {
      isSubscribed = false;
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [farmContracts, library?.provider, viewModel]);

  const getLpToken = (token: string) => {
    null;
  };

  const manageLpToken = (token: string) => {
    null;
  };

  const approveLpToken = (token: string) => {
    null;
  };

  const depositLpToken = (token: string, amount: string) => {
    null;
  };

  const withdrawLpToken = (token: string, amount: string) => {
    null;
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
