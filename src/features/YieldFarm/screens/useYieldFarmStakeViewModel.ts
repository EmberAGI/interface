import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useActiveWeb3React } from '../../../legacy/hooks';
import farmingContractABI from '../../../legacy/constants/abis/farmingContract.json';
import { ERC20_ABI } from '../../../legacy/constants/abis/erc20';
import { formatUnits } from 'ethers/lib/utils';
import { YieldFarmStats } from '../components/useYieldFarmStatsViewModel';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmViewModel {
  unstakedTokens: string;
  stakedTokens: string;
}

const initialViewModel = {
  unstakedTokens: '0',
  stakedTokens: '0',
};

export default function useYieldFarmViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const { userStakeBalance, stake } = useYieldFarmUserPosition(yieldFarmContractAddress);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      stakedTokens: userStakeBalance.toString(),
    }));
  }, [userStakeBalance]);

  return {
    viewModel,
    stake,
  };
}
