import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useActiveWeb3React } from '../../../legacy/hooks';
import farmingContractABI from '../../../legacy/constants/abis/farmingContract.json';
import { ERC20_ABI } from '../../../legacy/constants/abis/erc20';
import { formatUnits } from 'ethers/lib/utils';
import { YieldFarmStatsViewModel } from '../components/useYieldFarmStatsViewModel';

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
      tokenImg1: 'AirdaoLogo.png',
      tokenImg2: 'UsdcLogo.png',
    },
  ],
};

export default function useYieldFarmViewModel() {
  const { library } = useActiveWeb3React();
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const [farmContracts, setFarmContracts] = useState<string[]>();

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
          tokenImg1: 'AirdaoLogo.png',
          tokenImg2: 'UsdcLogo.png',
        },
        {
          farmContractAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
          stakeToken: 'AMB-BUSD-flp',
          rewardToken: 'AMB-BUSD-flp',
          lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
          tokenImg1: 'AirdaoLogo.png',
          tokenImg2: 'BusdLogo.png',
        },
      ],
    });
  }, []);

  const getLpToken = (token: string) => {
    console.log('getLpToken');
  };

  const manageLpToken = (token: string) => {
    console.log('manageLpToken');
  };

  const approveLpToken = (token: string) => {
    console.log('approveLpToken');
  };

  const depositLpToken = (token: string, amount: string) => {
    console.log('depositLpToken');
  };

  const withdrawLpToken = (token: string, amount: string) => {
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
