import { useActiveWeb3React } from 'legacy/hooks';
import { parseUnits, formatUnits } from 'ethers/lib/utils';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../../../legacy/state/transactions/hooks';
import { usePairContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function usePairStats(pairContractAddress: string) {
  const { library } = useActiveWeb3React();
  const [pairReserves, setPairReserves] = useState();

  const pairContract = usePairContract(pairContractAddress, false);
  useEffect(() => {
    const listener = async () => {
      try {
        const balance = await pairContract?.getReserves();
        console.log(balance, 'Listener fired');
        setPairReserves(balance);
      } catch (error) {
        console.error('Could not view balance of user', error);
      }
    };
    listener();
    // const stakedEvent = 'Staked';
    // yieldFarmContract?.on(stakedEvent, listener);
    // const withdrawnEvent = 'Withdrawn';
    // yieldFarmContract?.on(withdrawnEvent, listener);

    //return () => {};
  }, [pairContract]);
  return {};
}
