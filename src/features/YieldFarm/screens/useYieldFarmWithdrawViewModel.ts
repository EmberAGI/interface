import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useYieldFarmState from '../hooks/useYieldFarmState';
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
  const { stakingTokenAddress } = useYieldFarmState(yieldFarmContractAddress);
  const { decimals: stakingTokenDecimals } = useERC20Token(stakingTokenAddress);
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
      earnedTokens: Number(formatUnits(userEarnedRewards, stakingTokenDecimals)).toFixed(8).toString(),
    }));
  }, [stakingTokenDecimals, userEarnedRewards]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      stakedTokens: Number(formatUnits(userStakeBalance, stakingTokenDecimals)).toFixed(8).toString(),
    }));
  }, [stakingTokenDecimals, userStakeBalance]);

  useEffect(() => {
    if (withdrawAmount == undefined) {
      return;
    }
    let isWithdrawAboveStake = false;
    try {
      const withdrawAmountBN = parseUnits(withdrawAmount);
      isWithdrawAboveStake = withdrawAmountBN.gt(userStakeBalance);
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
