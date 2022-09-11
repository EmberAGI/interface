import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useTokenApproval from '../hooks/useTokenApproval';
import useYieldFarmState from '../hooks/useYieldFarmState';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmStakeViewModel {
  unstakedTokens: string;
  stakedTokens: string;
  showApproval: boolean;
  isApproved: boolean;
  pendingApproval: boolean;
  showAboveBalanceError: boolean;
}

const initialViewModel = {
  unstakedTokens: '0',
  stakedTokens: '0',
  showApproval: false,
  isApproved: false,
  pendingApproval: false,
  showAboveBalanceError: false,
};

export default function useYieldFarmStakeViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStakeViewModel>(initialViewModel);
  const { userStakeBalance, stake } = useYieldFarmUserPosition(yieldFarmContractAddress);
  const { stakingTokenAddress } = useYieldFarmState(yieldFarmContractAddress);
  const { userBalance: stakingTokenUserBalance, decimals: stakingTokenDecimals } = useERC20Token(stakingTokenAddress);
  const [stakeAmount, setStakeAmount] = useState<string | undefined>();
  const { approvalRequired, isApproved, pendingApproval, approve } = useTokenApproval(
    stakeAmount,
    stakingTokenAddress,
    yieldFarmContractAddress
  );

  const confirmStake = () => {
    if (stakeAmount != undefined) {
      stake(stakeAmount);
    }
  };

  const updateStakeAmount = (amount: string | 'max') => {
    if (amount === 'max' && stakingTokenUserBalance != undefined) {
      setStakeAmount(formatUnits(stakingTokenUserBalance, stakingTokenDecimals));
    } else {
      setStakeAmount(amount);
    }
  };

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      unstakedTokens: stakingTokenUserBalance
        ? Number(formatUnits(stakingTokenUserBalance, stakingTokenDecimals)).toFixed(8).toString()
        : '0',
    }));
  }, [stakingTokenDecimals, stakingTokenUserBalance]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      stakedTokens: Number(formatUnits(userStakeBalance, stakingTokenDecimals)).toFixed(8).toString(),
    }));
  }, [stakingTokenDecimals, userStakeBalance]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      showApproval: approvalRequired,
    }));
  }, [approvalRequired]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      isApproved: isApproved,
    }));
  }, [isApproved]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      pendingApproval: pendingApproval,
    }));
  }, [pendingApproval]);

  useEffect(() => {
    if (stakeAmount == undefined || stakingTokenUserBalance == undefined) {
      return;
    }
    let isStakeAboveBalance = false;
    try {
      const stakeAmountBN = parseUnits(stakeAmount);
      isStakeAboveBalance = stakeAmountBN.gt(stakingTokenUserBalance);
    } catch (error) {
      console.warn(error);
    } finally {
      setViewModel((viewModel) => ({
        ...viewModel,
        showAboveBalanceError: isStakeAboveBalance,
      }));
    }
  }, [stakingTokenUserBalance, stakeAmount]);

  return {
    viewModel,
    setStakeAmount: updateStakeAmount,
    approve,
    stake: confirmStake,
  };
}
