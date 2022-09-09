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
  const [withdrawAmount, setWithdrawAmount] = useState<string | undefined>();
  const [typedValue, setTypedValue] = useState('');
  const { userStakeBalance, userEarnedRewards, withdraw, claim, withdrawAndClaim } =
    useYieldFarmUserPosition(yieldFarmContractAddress);

  const onUserInput = (value: string) => {
    setWithdrawAmount(value);
    setTypedValue(value);
  };
  const confirmWithdraw = () => {
    if (withdrawAmount != undefined) {
      withdraw(withdrawAmount);
    }
  };

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      earnedTokens: userEarnedRewards ? userEarnedRewards.toString() : '0',
      stakedTokens: userStakeBalance.toString(),
    }));
  }, [userEarnedRewards, userStakeBalance]);

  return {
    viewModel,
    withdraw: confirmWithdraw,
    claim,
    withdrawAndClaim,
    onUserInput,
    typedValue,
  };
}
