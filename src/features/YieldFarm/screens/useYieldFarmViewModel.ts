import { useState } from 'react';
import config from 'config';

export interface LpTokenUserPosition {
  userBalance: string;
  userDeposited: string;
}

// TODO: refactor property farmContractAddress to just address in all instances
export interface YieldFarm {
  farmContractAddress: string;
  stakeToken: string;
  rewardToken: string;
  lpAddress: string;
  tokenImg1: string;
  tokenImg2: string;
}

export interface YieldFarmViewModel {
  yieldFarms: YieldFarm[];
}

const initialViewModel = {
  yieldFarms: [config.yieldFarms.usdc_amb, config.yieldFarms.busd_amb],
};

export default function useYieldFarmViewModel() {
  const [viewModel] = useState<YieldFarmViewModel>(initialViewModel);

  return {
    viewModel,
  };
}
