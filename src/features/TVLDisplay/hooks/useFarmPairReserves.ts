import { usePairContract } from '../../../legacy/hooks/useContract';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useYieldFarmState from '../../YieldFarm/hooks/useYieldFarmState';
import { TVLParameters } from '../../../libraries/TVLParser/types';
import { setupTVLParams } from '../../../libraries/TVLParser/helpers';

export default function useFarmPairReserves(contractAddress: string) {
  const { stakingTokenAddress, stakeBalance } = useYieldFarmState(contractAddress);
  const pairContract = usePairContract(stakingTokenAddress);
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
          const flpTotalSupply: BigNumber = await pairContract.totalSupply();
          const flpTotalBalance: string = BigNumber.from(flpTotalSupply).toString();
          const farmFLPbalance: string = stakeBalance
            ? BigNumber.from(stakeBalance).toString()
            : BigNumber.from('0').toString();
          tvlParams.totalFarmStakedTokens = farmFLPbalance;
          tvlParams.totalMintedTokens = flpTotalBalance;

          setTvlParameters(tvlParams);
          const decimals = await pairContract.decimals();
          setDecimals(decimals);
        }
      } catch (error) {
        console.error("Couldn't fetch stats", error);
      }
    };
    listener();
  }, [pairContract, stakeBalance, stakingTokenAddress, tvlParameters?.tokenA.decimals, tvlParameters?.tokenB.decimals]);
  return {
    tvlParameters,
    decimals,
  };
}
