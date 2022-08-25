import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useActiveWeb3React } from '../../legacy/hooks';
import farmingContractAbi from '../../legacy/constants/abis/farmingContract.json';

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
  const [farmTokens, setFarmTokens] = useState<string[]>();

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
    // Get token list from library
    const tokenList = ['AMB-wUSDC-flp'];

    setFarmTokens(tokenList);
  }, []);

  useEffect(() => {
    farmTokens?.forEach((value) => {
      const farmingContractAddress = '';
      // subscribe to farm contract changes
      const contract = new ethers.Contract(farmingContractAddress, farmingContractAbi);
    });

    return () => {
      // unsubscribe;
    };
  }, [farmTokens, library?.provider]);

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
