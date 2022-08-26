import React from 'react';
import AppBody from '../../legacy/pages/AppBody';
import YieldFarmStakeWithdrawHeaderView from './components/YieldFarmStakeWithdrawHeaderView';
import YieldFarmCardImageTextView from './components/YieldFarmCardImageTextView';
import YieldFarmCardStatsView from './components/YieldFarmCardStatsView';

export default function YieldFarmStakeView() {
  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView />
      <YieldFarmCardImageTextView />
      <YieldFarmCardStatsView />
    </AppBody>
  );
}
