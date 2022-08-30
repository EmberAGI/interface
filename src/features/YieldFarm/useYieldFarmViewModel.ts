import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useActiveWeb3React } from '../../legacy/hooks';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';
import { ERC20_ABI } from '../../legacy/constants/abis/erc20';

export interface YieldFarmStats {
  tvl: string;
  apr: string;
  dailyROI: string;
}

export interface LpTokenUserPosition {
  userBalance: string;
  userDeposited: string;
}

export interface YieldFarm {
  stakingTokenName: string;
  farmStats: YieldFarmStats;
  userPosition: LpTokenUserPosition;
}

export interface YieldFarmViewModel {
  yieldFarms: YieldFarm[];
}

const initialViewModel = {
  yieldFarms: [
    {
      stakingTokenName: 'AMB-wUSDC-flp',
      farmStats: {
        tvl: '50000',
        apr: '420',
        dailyROI: '35',
      },
      userPosition: {
        userBalance: '5',
        userDeposited: '1',
      },
    },
  ],
};

export default function useYieldFarmViewModel() {
  const { library } = useActiveWeb3React();
  const [viewModel, setViewModel] = useState<YieldFarmViewModel>(initialViewModel);
  const [farmContracts, setFarmContracts] = useState<string[]>();

  useEffect(() => {
    // Get farm contract list from library
    const farmList = ['0xE66240fD326ac1f263727C52c69F8dcDE6c5147B'];

    setFarmContracts(farmList);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribeFunctions: (() => ethers.Contract)[] = [];
    farmContracts?.forEach(async (address) => {
      // DEBUG
      console.log(`farmContracts?.forEach(${address} => ... )`);

      if (!isSubscribed) {
        return;
      }

      const farmContract = new ethers.Contract(address, farmingContractABI, library);
      // DEBUG
      console.log(`farmContract: ${farmContract}`);
      const stakingTokenAddress: string = await farmContract.stakingToken();
      // DEBUG
      console.log(`stakingTokenAddress: ${stakingTokenAddress}`);
      const stakingTokenContract: ethers.Contract = new ethers.Contract(stakingTokenAddress, ERC20_ABI, library);
      // DEBUG
      console.log(`stakingTokenContract: ${stakingTokenContract}`);
      const filter = stakingTokenContract.filters.Transfer(null, address);
      // DEBUG
      console.log(`filter: ${filter}`);
      const updateAPR = async () => {
        // DEBUG
        console.log('calculate & update APR...');

        const rewardsForDuration = await farmContract.getRewardForDuration();
        const rewardsDuration = await farmContract.rewardsDuration();
        const annualRewardPeriods = 365 / rewardsDuration;
        const annualRewards = rewardsForDuration * annualRewardPeriods;
        // DEBUG
        console.log(`annualRewards: ${annualRewards}`);
        const stakeBalance = await farmContract.totalSupply();
        const apr = (annualRewards / stakeBalance) * 100;
        // DEBUG
        console.log(`apr: ${apr}`);
        const stakingTokenName = await stakingTokenContract.name();
        // DEBUG
        console.log(`stakingTokenName: ${stakingTokenName}`);
        setViewModel({
          yieldFarms: [
            {
              stakingTokenName: 'AMB-wUSDC-flp',
              farmStats: {
                tvl: '50000',
                apr: apr.toString(),
                dailyROI: '35',
              },
              userPosition: {
                userBalance: '5',
                userDeposited: '1',
              },
            },
          ],
        });
        /*setViewModel((viewModel) => {
          return {
            ...viewModel,
            yieldFarms: viewModel.yieldFarms.map((yieldFarm) => {
              if (yieldFarm.stakingTokenName != stakingTokenName) {
                return yieldFarm;
              }

              return {
                ...yieldFarm,
                farmStats: {
                  ...yieldFarm.farmStats,
                  apr: apr.toString(),
                },
              };
            }),
          };
        });*/
      };
      await updateAPR();

      if (!isSubscribed) {
        return;
      }

      const listener = async () => {
        await updateAPR();
      };
      stakingTokenContract.on(filter, listener);
      unsubscribeFunctions.push(() => stakingTokenContract.off(filter, listener));
    });

    return () => {
      // DEBUG
      console.log('useEffect cleanup...');

      isSubscribed = false;
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [farmContracts, library]);

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
