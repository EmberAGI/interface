import { useActiveWeb3React } from 'legacy/hooks';
import { usePairContract } from '../../../legacy/hooks/useContract';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useYieldFarmContract } from '../../../legacy/hooks/useContract';
import { PoolToken, TVLParameters } from '../../../utils/tvlParser';

export default function usePairReserves(yieldFarmContractAddress?: string) {
  const { library } = useActiveWeb3React();
  const yieldFarmContract = useYieldFarmContract(yieldFarmContractAddress);
  const pairContractAddress = yieldFarmContract?.stakingToken();
  const pairContract = usePairContract(pairContractAddress);
  const [tvlParameters, setTvlParameters] = useState<TVLParameters>();
  const [decimals, setDecimals] = useState();

  useEffect(() => {
    const listener = async () => {
      try {
        const tokenA: PoolToken = { address: '', reserve: '' };
        const tokenB: PoolToken = { address: '', reserve: '' };
        const reserves = await pairContract?.getReserves();
        tokenA.reserve = BigNumber.from(reserves[0]).toString();
        tokenB.reserve = BigNumber.from(reserves[1]).toString();
        const addressToken0 = await pairContract?.token0();
        tokenA.address = addressToken0;
        const addressToken1 = await pairContract?.token1();
        tokenB.address = addressToken1;
        const flpTotalBalance: string = await pairContract?.totalSupply().then((res: BigNumber) => {
          return BigNumber.from(res).toString;
        });
        const farmFLPbalance: string = await yieldFarmContract?.totalSupply().then((res: BigNumber) => {
          return BigNumber.from(res).toString;
        });
        const tvlParams: TVLParameters = {
          tokenA: tokenA,
          tokenB: tokenB,
          totalFarmStakedTokens: farmFLPbalance,
          totalMintedTokens: flpTotalBalance,
        };
        setTvlParameters(tvlParams);
        const decimals = await pairContract?.decimals();
        setDecimals(decimals);
      } catch (error) {
        console.error('Could fetch stats', error);
      }
    };
    listener();
  }, [pairContract, yieldFarmContract]);
  return {
    tvlParameters,
    decimals,
  };
}
