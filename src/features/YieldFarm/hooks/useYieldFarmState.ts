import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function useYieldFarmUserPosition(yieldFarmContractAddress: string) {
  const yieldFarmContract = useYieldFarmContract(yieldFarmContractAddress);
  const [stakingTokenAddress, setStakingTokenAddress] = useState<string | undefined>();
  const [stakeBalance, setStakeBalance] = useState<BigNumber | undefined>();
  const [rewardsDuration, setRewardsDuration] = useState<BigNumber | undefined>();
  const [rewardsForDuration, setRewardsForDuration] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (yieldFarmContract == undefined) {
      return;
    }
    yieldFarmContract
      .stakingToken()
      .then((stakingTokenAddress: string) => {
        setStakingTokenAddress(stakingTokenAddress);
      })
      .catch((error: any) => console.error(error));
  }, [yieldFarmContract]);

  useEffect(() => {
    if (yieldFarmContract == undefined) {
      return;
    }

    const listener = async () => {
      try {
        const balance = await yieldFarmContract.totalSupply();
        console.log(`totalSupply: ${JSON.stringify(balance)}`);
        setStakeBalance(balance);
      } catch (error) {
        console.error('Could not view balance of user', error);
      }
    };
    listener();

    const stakedEvent = 'Staked';
    yieldFarmContract?.on(stakedEvent, listener);

    const withdrawnEvent = 'Withdrawn';
    yieldFarmContract?.on(withdrawnEvent, listener);

    return () => {
      yieldFarmContract?.off(stakedEvent, listener);
      yieldFarmContract?.off(withdrawnEvent, listener);
    };
  }, [yieldFarmContract]);

  useEffect(() => {
    if (yieldFarmContract == undefined) {
      return;
    }
    yieldFarmContract
      .rewardsDuration()
      .then((value: BigNumber) => {
        console.log(`rewardsDuration: ${JSON.stringify(value)}`);
        setRewardsDuration(value);
      })
      .catch((error: any) => console.error(error));
  }, [yieldFarmContract]);

  useEffect(() => {
    if (yieldFarmContract == undefined) {
      return;
    }
    yieldFarmContract
      .getRewardForDuration()
      .then((value: BigNumber) => {
        console.log(`getRewardForDuration: ${JSON.stringify(value)}`);
        setRewardsForDuration(value);
      })
      .catch((error: any) => console.error(error));
  }, [yieldFarmContract]);

  return {
    stakingTokenAddress,
    stakeBalance,
    rewardsDuration,
    rewardsForDuration,
  };
}
