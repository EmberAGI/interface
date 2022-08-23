import { useState, useEffect } from 'react';

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
  stats: YieldFarmStats;
  userPosition: LpTokenUserPosition;
}

export type YieldFarmViewModel = [YieldFarm] | undefined;

export default function useYieldFarmViewModel() {
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(undefined);

  useEffect(() => {
    setViewModel([
      {
        stats: {
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
