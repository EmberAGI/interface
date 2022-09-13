import { useActiveWeb3React } from 'legacy/hooks';
import { parseUnits, formatUnits } from 'ethers/lib/utils';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../../../legacy/state/transactions/hooks';
import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function useYieldFarmUserPosition(yieldFarmContractAddress: string) {
  const { library, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const yieldFarmContract = useYieldFarmContract(yieldFarmContractAddress);
  const [userStakeBalance, setUserStakeBalance] = useState(BigNumber.from('0'));
  const [userEarnedRewards, setUserEarnedRewards] = useState(BigNumber.from('0'));

  // REFACTOR: Get this dynamically
  const stakingTokenDecimals = 18;

  const stake = (stakeAmount: string) => {
    yieldFarmContract
      ?.stake(parseUnits(stakeAmount, stakingTokenDecimals))
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Staked ${stakeAmount} LP tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not stake funds', error));
  };

  const claim = () => {
    yieldFarmContract
      ?.getReward()
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Claimed rewards tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not claim funds', error));
  };

  const withdraw = (withdrawAmount: string) => {
    yieldFarmContract
      ?.withdraw(parseUnits(withdrawAmount, stakingTokenDecimals))
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Withdrew ${withdrawAmount} LP tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not withdraw funds', error));
  };

  const withdrawAndClaim = () => {
    yieldFarmContract
      ?.exit()
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Claimed rewards + exited staking position` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not exit funds', error));
  };

  useEffect(() => {
    if (account == undefined) {
      return;
    }
    const listener = async () => {
      try {
        const earned = await yieldFarmContract?.earned(account);
        setUserEarnedRewards(earned);
      } catch (error) {
        console.error('Could not view earned amount of user', error);
      }
    };
    const eventName = 'block';
    library?.on(eventName, listener);

    return () => {
      library?.off(eventName, listener);
    };
  }, [account, library, yieldFarmContract]);

  useEffect(() => {
    if (account == undefined) {
      return;
    }
    const listener = async () => {
      try {
        const balance = await yieldFarmContract?.balanceOf(account);
        console.log(balance, 'Listener fired');
        setUserStakeBalance(balance);
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
  }, [account, yieldFarmContract]);

  return {
    userStakeBalance: userStakeBalance,
    userEarnedRewards: userEarnedRewards,
    stake: stake,
    withdraw: withdraw,
    claim: claim,
    withdrawAndClaim: withdrawAndClaim,
  };
}
