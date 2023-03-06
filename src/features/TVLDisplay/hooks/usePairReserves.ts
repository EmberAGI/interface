import { usePairContract } from '../../../legacy/hooks/useContract';
import { useEffect, useState } from 'react';
import { TVLParameters } from '../../../libraries/TVLParser/types';
import { setupTVLParams } from '../../../libraries/TVLParser/helpers';

export default function usePairReserves(contractAddress: string) {
  const pairContract = usePairContract(contractAddress);
  const [tvlParameters, setTvlParameters] = useState<TVLParameters>();
  const [decimals, setDecimals] = useState<number>(0);

  useEffect(() => {
    const listener = async () => {
      try {
        if (pairContract) {
          const tvlParams = await setupTVLParams(
            pairContract,
            tvlParameters?.tokenA.decimals,
            tvlParameters?.tokenB.decimals
          );
          setTvlParameters(tvlParams);
          const decimals = await pairContract.decimals();
          setDecimals(decimals);
        }
      } catch (error) {
        console.error('Could fetch stats', error);
      }
    };
    listener();
  }, [pairContract]);
  return {
    tvlParameters,
    decimals,
  };
}
