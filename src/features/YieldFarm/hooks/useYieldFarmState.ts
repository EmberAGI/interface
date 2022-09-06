import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function useYieldFarmUserPosition(yieldFarmContractAddress: string) {
  //const { library, account } = useActiveWeb3React();
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
        setStakeBalance(BigNumber.from(balance));
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
      .then((value: number) => setRewardsDuration(BigNumber.from(value)))
      .catch((error: any) => console.error(error));
  }, [yieldFarmContract]);

  useEffect(() => {
    if (yieldFarmContract == undefined) {
      return;
    }
    yieldFarmContract
      .getRewardForDuration()
      .then((value: number) => setRewardsForDuration(BigNumber.from(value)))
      .catch((error: any) => console.error(error));
  }, [yieldFarmContract]);

  return {
    stakingTokenAddress,
    stakeBalance,
    rewardsDuration,
    rewardsForDuration,
  };
}
