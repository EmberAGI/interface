import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useActiveWeb3React } from '../../../legacy/hooks';
import farmingContractABI from '../../../legacy/constants/abis/farmingContract.json';
import { ERC20_ABI } from '../../../legacy/constants/abis/erc20';
import { formatUnits } from 'ethers/lib/utils';
import { YieldFarmStats } from '../components/useYieldFarmStatsViewModel';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

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

export default function useYieldFarmViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const { userStakeBalance, stake: deposit } = useYieldFarmUserPosition(yieldFarmContractAddress);

  useEffect(() => {}, []);

  const stake = (amount: string) => {
    console.log('getLpToken');
  };

  return {
    viewModel,
    stake,
  };
}
