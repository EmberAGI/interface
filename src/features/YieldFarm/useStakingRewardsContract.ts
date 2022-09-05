import { useActiveWeb3React } from 'legacy/hooks';
import { BigNumber, ethers } from 'ethers';
import { useTransactionAdder } from '../../legacy/state/transactions/hooks';
import { useSRContract, useTokenContract } from '../../legacy/hooks/useContract';

function useStakingRewardContract(stakingRewardContractAddress: string) {
  return useSRContract(stakingRewardContractAddress);
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

//Stake an amount
export function useDepositStakingRewardFunds(stakingRewardContractAddress: string, depositAmount: number) {
  const addTransaction = useTransactionAdder();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      const txReceipt = await stakingRewardsContract?.stake(depositAmount * 10 ** 18);
      addTransaction(txReceipt, { summary: `Staked ${depositAmount} LP tokens` });
    } catch (error) {
      console.error('Could not stake funds', error);
    }
  };
}

//Claim rewards
export function useClaimStakingRewards(stakingRewardContractAddress: string) {
  const addTransaction = useTransactionAdder();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      const txReceipt = await stakingRewardsContract?.getReward();
      addTransaction(txReceipt, { summary: `Claimed rewards tokens` });
    } catch (error) {
      console.error('Could not withdraw funds', error);
    }
  };
}

//Withdraw an amount staked
export function useWithdrawStakingRewards(stakingRewardContractAddress: string, withdrawAmount: number) {
  const addTransaction = useTransactionAdder();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      const txReceipt = await stakingRewardsContract?.withdraw(withdrawAmount * 10 ** 18);
      addTransaction(txReceipt, { summary: `Withdrew ${withdrawAmount} LP tokens` });
    } catch (error) {
      console.error('Could not withdraw funds', error);
    }
  };
}

//Withdraw all amount and claim rewards
export function useWithdrawAndClaimStakingRewards(stakingRewardContractAddress: string) {
  const addTransaction = useTransactionAdder();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      const txReceipt = await stakingRewardsContract?.exit();
      addTransaction(txReceipt, { summary: `Claimed rewards + exited staking position` });
    } catch (error) {
      console.error('Could not exit funds', error);
    }
  };
}

//User balance staked balance
export function useViewStakedBalanceOfUser(stakingRewardContractAddress: string) {
  const { account } = useActiveWeb3React();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      await stakingRewardsContract?.balanceOf(account);
    } catch (error) {
      console.error('Could not view balance of user', error);
    }
  };
}

//User earned amount of tokens
export function useViewStakedEarnedOfUser(stakingRewardContractAddress: string) {
  const { account } = useActiveWeb3React();
  const stakingRewardsContract = useStakingRewardContract(stakingRewardContractAddress);
  return async () => {
    try {
      await stakingRewardsContract?.earned(account);
    } catch (error) {
      console.error('Could not view earned amount of user', error);
    }
  };
}
