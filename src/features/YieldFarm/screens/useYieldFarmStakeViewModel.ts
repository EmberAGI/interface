import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useTokenApproval from '../hooks/useTokenApproval';
import useYieldFarmState from '../hooks/useYieldFarmState';
import useYieldFarmUserPosition from '../hooks/useYieldFarmUserPosition';

export interface YieldFarmStakeViewModel {
  unstakedTokens: string;
  stakedTokens: string;
  isApproved: boolean;
  pendingApproval: boolean;
}

const initialViewModel = {
  unstakedTokens: '0',
  stakedTokens: '0',
  isApproved: true,
  pendingApproval: false,
};

export default function useYieldFarmStakeViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStakeViewModel>(initialViewModel);
  const { userStakeBalance, stake } = useYieldFarmUserPosition(yieldFarmContractAddress);
  const { stakingTokenAddress } = useYieldFarmState(yieldFarmContractAddress);
  const { userBalance } = useERC20Token(stakingTokenAddress);
  const [stakeAmount, setStakeAmount] = useState<string | undefined>();
  const { isApproved, pendingApproval, approve } = useTokenApproval(
    stakeAmount,
    stakingTokenAddress,
    yieldFarmContractAddress
  );

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      unstakedTokens: userBalance ? userBalance.toString() : '0',
    }));
  }, [userBalance]);

  useEffect(() => {
    setViewModel((viewModel) => ({
      ...viewModel,
      stakedTokens: userStakeBalance.toString(),
    }));
  }, [userStakeBalance]);

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

  return {
    viewModel,
    setStakeAmount,
    approve,
    stake,
  };
}
