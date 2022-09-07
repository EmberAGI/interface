import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useYieldFarmState from '../hooks/useYieldFarmState';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmStakeViewModel {
  stakedTokens: string;
  earnedTokens: string;
}

const initialViewModel = {
  stakedTokens: '0',
  earnedTokens: '0',
};

export default function useYieldFarmWithdrawViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStakeViewModel>(initialViewModel);
  const { userStakeBalance, userEarnedRewards, withdraw, claim, withdrawAndClaim } =
    useYieldFarmUserPosition(yieldFarmContractAddress);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      earnedTokens: userEarnedRewards ? userEarnedRewards.toString() : '0',
      stakedTokens: userStakeBalance.toString(),
    }));
  }, [userEarnedRewards, userStakeBalance]);

  return {
    viewModel,
    withdraw,
    claim,
    withdrawAndClaim,
  };
}
