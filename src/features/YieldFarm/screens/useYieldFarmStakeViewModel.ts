import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useYieldFarmState from '../hooks/useYieldFarmState';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmStakeViewModel {
  unstakedTokens: string;
  stakedTokens: string;
}

const initialViewModel = {
  unstakedTokens: '0',
  stakedTokens: '0',
};

export default function useYieldFarmStakeViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStakeViewModel>(initialViewModel);
  const { userStakeBalance, stake } = useYieldFarmUserPosition(yieldFarmContractAddress);
  const { stakingTokenAddress } = useYieldFarmState(yieldFarmContractAddress);
  const { userBalance } = useERC20Token(stakingTokenAddress);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      unstakedTokens: userBalance.toString(),
      stakedTokens: userStakeBalance.toString(),
    }));
  }, [userBalance, userStakeBalance]);

  return {
    viewModel,
    stake,
  };
}
