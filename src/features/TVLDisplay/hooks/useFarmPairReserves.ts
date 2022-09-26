import { useActiveWeb3React } from 'legacy/hooks';
import { usePairContract } from '../../../legacy/hooks/useContract';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useYieldFarmState from '../../YieldFarm/hooks/useYieldFarmState';
import { PoolToken, TVLParameters } from '../../../libraries/TVLParser/types';

export default function useFarmPairReserves(yieldFarmContractAddress: string) {
  const { library } = useActiveWeb3React();
  const { stakingTokenAddress, stakeBalance } = useYieldFarmState(yieldFarmContractAddress);
  const pairContract = usePairContract(stakingTokenAddress);
  const [tvlParameters, setTvlParameters] = useState<TVLParameters>();
  const [decimals, setDecimals] = useState<number>(0);

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
        const flpTotalSupply: BigNumber = await pairContract?.totalSupply();
        const flpTotalBalance: string = BigNumber.from(flpTotalSupply).toString();
        const farmFLPbalance: string = BigNumber.from(stakeBalance).toString();
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
  }, [pairContract, stakeBalance, stakingTokenAddress]);
  return {
    tvlParameters,
    decimals,
  };
}
