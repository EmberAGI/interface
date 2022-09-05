import { useActiveWeb3React } from 'legacy/hooks';
import { parseUnits } from 'ethers/lib/utils';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../../../legacy/state/transactions/hooks';
import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';

export default function useYieldFarmUserPosition(stakingRewardContractAddress: string) {
  const { library, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const stakingRewardsContract = useYieldFarmContract(stakingRewardContractAddress);
  const [userStakeBalance, setUserStakeBalance] = useState(0);
  const [userEarnedRewards, setUserEarnedRewards] = useState(0);

  const stakingTokenDecimals = 18;

  const deposit = (depositAmount: string) => {
    stakingRewardsContract
      ?.stake(parseUnits(depositAmount, stakingTokenDecimals))
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Staked ${depositAmount} LP tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not stake funds', error));
  };

  const claim = () => {
    stakingRewardsContract
      ?.getReward()
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Claimed rewards tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not claim funds', error));
  };

  const withdraw = (withdrawAmount: string) => {
    stakingRewardsContract
      ?.withdraw(parseUnits(withdrawAmount, stakingTokenDecimals))
      .then((txResponse: TransactionResponse) => {
        addTransaction(txResponse, { summary: `Withdrew ${withdrawAmount} LP tokens` });
        return txResponse.wait();
      })
      .catch((error: any) => console.error('Could not withdraw funds', error));
  };

  const withdrawAndClaim = () => {
    stakingRewardsContract
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
        const earned = await stakingRewardsContract?.earned(account);
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
  }, [account, library, stakingRewardsContract]);

  useEffect(() => {
    if (account == undefined) {
      return;
    }
    const listener = async () => {
      try {
        const balance = await stakingRewardsContract?.balanceOf(account);
        setUserStakeBalance(balance);
      } catch (error) {
        console.error('Could not view balance of user', error);
      }
    };
    const stakedEvent = 'Staked';
    library?.on(stakedEvent, listener);

    const withdrawnEvent = 'Withdrawn';
    library?.on(withdrawnEvent, listener);

    return () => {
      library?.off(stakedEvent, listener);
      library?.off(withdrawnEvent, listener);
    };
  }, [account, library, stakingRewardsContract]);

  return {
    userStakeBalance: userStakeBalance,
    userEarnedRewards: userEarnedRewards,
    deposit: deposit,
    withdraw: withdraw,
    claim: claim,
    withdrawAndClaim: withdrawAndClaim,
  };
}

//This function is to access the ERC20 contract that is being staked
// Missing returning the staking contract so we can handle it

/*
function useStakingContract(stakingRewardContractAdress: string) {
  const { account } = useActiveWeb3React();
  const SRContract = useStakingRewardContract(stakingRewardContractAdress);
  const stakingAddress = async () => {
    const address = await SRContract.stakingToken();
    return address;
  };
}
*/
