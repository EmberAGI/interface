import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useYieldFarmState from '../hooks/useYieldFarmState';

export interface YieldFarmStatsViewModel {
  tvl: string;
  apr: string;
  dailyROI: string;
}

const initialFarmViewModel = {
  tvl: '0',
  apr: '0',
  dailyROI: '0',
};

export default function useYieldFarmStatsViewModel(contractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStatsViewModel>(initialFarmViewModel);
  const { stakingTokenAddress, stakeBalance, rewardsDuration, rewardsForDuration } = useYieldFarmState(contractAddress);
  const { decimals: stakingTokenDecimals } = useERC20Token(stakingTokenAddress);

  useEffect(() => {
    if (rewardsDuration == undefined || rewardsForDuration == undefined || stakeBalance == undefined) {
      return;
    }
    if (rewardsDuration.isZero() || stakeBalance.isZero()) {
      return;
    }
    const daysPerYear = 365;
    const calculateAPR = (
      rewardsDurationSeconds: BigNumber,
      rewardsForDuration: BigNumber,
      stakeBalance: BigNumber
    ) => {
      const secondsPerDay = BigNumber.from(86400);
      const secondsPerYear = secondsPerDay.mul(daysPerYear);
      const annualRewardPeriods = BigNumber.from(secondsPerYear).div(rewardsDurationSeconds);
      const annualRewards = rewardsForDuration.mul(annualRewardPeriods);
      const apr = annualRewards.div(stakeBalance).mul(100).toNumber();
      return apr;
    };

    const newAPR = calculateAPR(rewardsDuration, rewardsForDuration, stakeBalance);
    setViewModel({
      tvl: Number(formatUnits(stakeBalance, stakingTokenDecimals)).toFixed(8).toString(),
      apr: newAPR.toFixed(2).toString(),
      dailyROI: (newAPR / daysPerYear).toFixed(2).toString(),
    });
  }, [rewardsDuration, rewardsForDuration, stakeBalance, stakingTokenDecimals]);

  return { viewModel };
}
