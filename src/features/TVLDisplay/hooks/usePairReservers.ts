import { useActiveWeb3React } from 'legacy/hooks';
import { parseUnits, formatUnits } from 'ethers/lib/utils';
import { useCurrency } from '../../../legacy/hooks/Tokens';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../../../legacy/state/transactions/hooks';
import { usePairContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export default function usePairReserves(pairContractAddress: string) {
  const { library } = useActiveWeb3React();
  const [pairReserves, setPairReserves] = useState();
  const [address0, setAddress0] = useState();
  const [address1, setAddress1] = useState();

  const pairContract = usePairContract(pairContractAddress, false);
  useEffect(() => {
    const listener = async () => {
      try {
        const reserves = await pairContract?.getReserves();
        setPairReserves(reserves);
        const addressToken0 = await pairContract?.token0();
        setAddress0(addressToken0);
        const addressToken1 = await pairContract?.token1();
        setAddress1(addressToken1);
        console.log(reserves, addressToken0, addressToken1, 'Stats');
      } catch (error) {
        console.error('Could fetch stats', error);
      }
    };
    listener();
  }, [pairContract]);
  const currency0 = useCurrency(address0) ?? undefined;
  const currency1 = useCurrency(address1) ?? undefined;
  console.log(currency0, 'currency0');
  console.log(currency1, 'currency1');
  return {
    pairReserves,
    address0,
    address1,
  };
}
