import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function useYieldFarmUserPosition(yieldFarmContractAddress: string) {
  //const { library, account } = useActiveWeb3React();
  const yieldFarmContract = useYieldFarmContract(yieldFarmContractAddress);
  const [stakingTokenAddress, setStakingTokenAddress] = useState('');
  const [stakeBalance, setStakeBalance] = useState(BigNumber.from(0));
  const [rewardsDuration, setRewardsDuration] = useState(BigNumber.from(0));
  const [rewardsForDuration, setRewardsForDuration] = useState(BigNumber.from(0));

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
    yieldFarmContract
      .totalSupply()
      .then((value: number) => setStakeBalance(BigNumber.from(value)))
      .catch((error: any) => console.error(error));
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
