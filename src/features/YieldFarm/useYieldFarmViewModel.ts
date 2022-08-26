import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useActiveWeb3React } from '../../legacy/hooks';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';

export interface YieldFarmStats {
  tokenName: string;
  tvl: string;
  apy: string;
  dailyROI: string;
}

export interface LpTokenUserPosition {
  tokenName: string;
  userBalance: string;
  userDeposited: string;
}

export interface YieldFarm {
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
        farmStats: {
          tokenName: 'AMB-wUSDC-flp',
          tvl: '50000',
          apy: '420',
          dailyROI: '35',
        },
        userPosition: {
          tokenName: 'AMB-wUSDC-flp',
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
    let unsubscribe: () => ethers.Contract | undefined;
    farmContracts?.forEach(async (address) => {
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
        setViewModel();
      };
      await updateAPR();
      const listener = async () => {
        await updateAPR();
      };
      stakingTokenContract.on(filter, listener);
      unsubscribe = () => stakingTokenContract.off(filter, listener);
    });

    return () => {
      unsubscribe();
    };
  }, [farmContracts, library?.provider]);

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
