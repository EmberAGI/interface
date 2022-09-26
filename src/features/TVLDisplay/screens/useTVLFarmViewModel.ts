import { useState, useEffect } from 'react';
import usePairReserves from '../hooks/usePairReserves';
import { TVLParser } from '../../../libraries/TVLParser';

export default function useTVLFarmViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<string>('');
  const { tvlParameters, decimals } = usePairReserves?.(yieldFarmContractAddress);
  useEffect(() => {
    console.log(tvlParameters, 'TVLParameters', decimals, 'decimals');
    const tvlParser = new TVLParser(decimals, undefined, tvlParameters);
    const farmTvlUSD = tvlParser.parse();
    console.log(farmTvlUSD, 'farm tvl usd');
    setViewModel(farmTvlUSD);
  }, [decimals, tvlParameters]);

  return {
    viewModel,
  };
}
