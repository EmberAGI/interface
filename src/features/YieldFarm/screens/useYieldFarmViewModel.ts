import { useState, useEffect } from 'react';
import AirdaoLogo from '../../../assets/images/AirdaoLogo.png';
import BusdLogo from '../../../assets/images/BusdLogo.png';
import UsdcLogo from '../../../assets/images/UsdcLogo.png';

export interface LpTokenUserPosition {
  userBalance: string;
  userDeposited: string;
}

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
  yieldFarms: [
    {
      farmContractAddress: '0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585',
      stakeToken: 'amb-usdc',
      rewardToken: 'amb-usdc',
      lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
      tokenImg1: AirdaoLogo,
      tokenImg2: UsdcLogo,
    },
  ],
};

export default function useYieldFarmViewModel() {
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const [, setFarmContracts] = useState<string[]>();

  useEffect(() => {
    // Get farm contract list from library
    const farmList = ['0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585', '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494'];
    setFarmContracts(farmList);
    setViewModel({
      yieldFarms: [
        {
          farmContractAddress: '0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585',
          stakeToken: 'AMB-USDC-flp',
          rewardToken: 'AMB-USDC-flp',
          lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
          tokenImg1: AirdaoLogo,
          tokenImg2: UsdcLogo,
        },
        {
          farmContractAddress: '0xa17DdfBCB5D8304835062324D99bfBd1d5cE4841',
          stakeToken: 'AMB-BUSD-flp',
          rewardToken: 'AMB-BUSD-flp',
          lpAddress: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
          tokenImg1: AirdaoLogo,
          tokenImg2: BusdLogo,
        },
      ],
    });
  }, []);

  const getLpToken = () => {
    console.log('getLpToken');
  };

  const manageLpToken = () => {
    console.log('manageLpToken');
  };

  const approveLpToken = () => {
    console.log('approveLpToken');
  };

  const depositLpToken = () => {
    console.log('depositLpToken');
  };

  const withdrawLpToken = () => {
    console.log('withdrawLpToken');
  };

  return {
    viewModel,
    getLpToken,
    manageLpToken,
    approveLpToken,
    depositLpToken,
    withdrawLpToken,
  };
}
