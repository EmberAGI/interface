import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from '../../../legacy/hooks';
import { useTokenContract } from '../../../legacy/hooks/useContract';

export default function useERC20Token(tokenAddress?: string) {
  const { account } = useActiveWeb3React();
  const tokenContract = useTokenContract(tokenAddress);
  const [userBalance, setUserBalance] = useState<BigNumber | undefined>();
  const [decimals, setDecimals] = useState<number | undefined>();

  useEffect(() => {
    if (tokenContract == undefined || account == undefined) {
      return;
    }

    const listener = async () => {
      try {
        const balance = await tokenContract.balanceOf(account);
        setUserBalance(balance);
      } catch (error) {
        console.error('Could not view balance of user', error);
      }
    };
    const tokenToAccountFilter = tokenContract.filters.Transfer(null, account);
    tokenContract.on(tokenToAccountFilter, listener);

    const tokenFromAccountFilter = tokenContract.filters.Transfer(account);
    tokenContract.on(tokenFromAccountFilter, listener);

    return () => {
      tokenContract.off(tokenToAccountFilter, listener);
      tokenContract.off(tokenFromAccountFilter, listener);
    };
  }, [account, tokenContract]);

  useEffect(() => {
    if (tokenContract == undefined) {
      return;
    }

    tokenContract
      .decimals()
      .then((decimals: number) => setDecimals(decimals))
      .catch((error: any) => {
        setDecimals(18);
        console.error('Could not get decimals of token', error);
      });
  }, [tokenContract]);

  return {
    contract: tokenContract ?? undefined,
    userBalance,
    decimals,
  };
}
