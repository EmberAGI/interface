import { useActiveWeb3React } from 'legacy/hooks';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';
import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useTransactionAdder } from '../../legacy/state/transactions/hooks';

export default function useStakingRewardsTransactions(
  stakingRewardContractAddress: string,
  amountToWithdraw?: string,
  amountToStake?: string
) {
  const addTransaction = useTransactionAdder();
  const { library } = useActiveWeb3React();
  const [stakingRewardContract, setStakingRewardContract] = useState<ethers.Contract>(
    new ethers.Contract(stakingRewardContractAddress, farmingContractABI, library)
  );
  useEffect(() => {
    setStakingRewardContract(new ethers.Contract(stakingRewardContractAddress, farmingContractABI, library));
  }, [stakingRewardContractAddress, library]);

  const withdrawFunds = async () => {
    const res = await stakingRewardContract.withdraw(Number(amountToWithdraw) * 10 ** 18);
    const base = `You have withdrawned ${amountToWithdraw} tokens}`;
    addTransaction(res, {
      summary: base,
    });
  };

  const stakeFunds = async () => {
    const res = await stakingRewardContract.withdraw(Number(amountToStake) * 10 ** 18);
    const base = `You have staked ${amountToStake} tokens}`;
    addTransaction(res, {
      summary: base,
    });
  };

  const claimRewards = async () => {
    const res = await stakingRewardContract.getReward();
    const base = `Reward tokens have been claimed`;
    addTransaction(res, {
      summary: base,
    });
  };

  const claimRewardsAndWithdrawFunds = async () => {
    const res = await stakingRewardContract.exit();
    const base = `Tokens have been withdrawned & rewards have been claimed`;
    addTransaction(res, {
      summary: base,
    });
  };

  return {
    withdrawFunds,
    stakeFunds,
    claimRewards,
    claimRewardsAndWithdrawFunds,
  };
}
