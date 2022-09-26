import { useState, useEffect } from 'react';
import useFarmPairReserves from '../hooks/useFarmPairReserves';
import { TVLParser } from '../../../utils/tvlParser';

export default function useTVLFarmViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<string>('');
  const { tvlParameters, decimals } = useFarmPairReserves?.(yieldFarmContractAddress);
  useEffect(() => {
    const tvlParser = new TVLParser(decimals, undefined, tvlParameters);
    const farmTvlUSD = tvlParser.parse();
    setViewModel(farmTvlUSD);
  }, [decimals, tvlParameters]);

  return {
    viewModel,
  };
}
