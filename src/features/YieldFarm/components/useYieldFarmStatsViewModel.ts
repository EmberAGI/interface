import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import useERC20Token from '../hooks/useERC20Token';
import useYieldFarmState from '../hooks/useYieldFarmState';

export interface YieldFarmStatsViewModel {
  periodFinish: string;
  tvl: string;
  apr: string;
  dailyROI: string;
}

const initialFarmViewModel = {
  periodFinish: '0',
  tvl: '0',
  apr: '0',
  dailyROI: '0',
};

export default function useYieldFarmStatsViewModel(contractAddress: string) {
  const [viewModel, setViewModel] = useState<YieldFarmStatsViewModel>(initialFarmViewModel);
  const { stakingTokenAddress, stakeBalance, rewardsDuration, rewardsForDuration, periodFinish } =
    useYieldFarmState(contractAddress);
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
      const precisionMultiplier = 10000;
      const percentageDivider = 100;
      const apr = annualRewards.mul(precisionMultiplier).div(stakeBalance).toNumber() / percentageDivider;
      return apr;
    };

    const newAPR = calculateAPR(rewardsDuration, rewardsForDuration, stakeBalance);
    setViewModel({
      periodFinish: periodFinish ? periodFinish.toString() : '',
      tvl: Number(formatUnits(stakeBalance, stakingTokenDecimals)).toFixed(8).toString(),
      apr: newAPR.toFixed(2).toString(),
      dailyROI: (newAPR / daysPerYear).toFixed(2).toString(),
    });
  }, [rewardsDuration, rewardsForDuration, stakeBalance, stakingTokenDecimals, periodFinish]);

  return { viewModel };
}
