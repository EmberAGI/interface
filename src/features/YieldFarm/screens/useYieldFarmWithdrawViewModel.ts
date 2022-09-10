import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmWithdrawViewModel {
  stakedTokens: string;
  earnedTokens: string;
  showAboveStakeError: boolean;
}

const initialViewModel = {
  stakedTokens: '0',
  earnedTokens: '0',
  showAboveStakeError: false,
};

export default function useYieldFarmWithdrawViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmWithdrawViewModel>(initialViewModel);
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

  useEffect(() => {
    if (withdrawAmount == undefined) {
      return;
    }
    let isWithdrawAboveStake = false;
    try {
      const withdrawAmountBN = parseUnits(withdrawAmount);
      const userStakeBalanceBN = parseUnits(userStakeBalance);
      isWithdrawAboveStake = withdrawAmountBN.gt(userStakeBalanceBN);
    } catch (error) {
      console.warn(error);
    } finally {
      setViewModel((viewModel) => ({
        ...viewModel,
        showAboveStakeError: isWithdrawAboveStake,
      }));
    }
  }, [userStakeBalance, withdrawAmount]);

  return {
    viewModel,
    withdraw: confirmWithdraw,
    claim,
    withdrawAndClaim,
    onUserInput,
    typedValue,
  };
}
