import { useState, useEffect } from 'react';
import useFarmPairReserves from '../hooks/useFarmPairReserves';
import { TVLParser } from '../../../libraries/TVLParser';

export default function useTVLFarmViewModel(yieldFarmContractAddress: string) {
  const [viewModel, setViewModel] = useState<string>('');
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { tvlParameters, decimals } = useFarmPairReserves?.(yieldFarmContractAddress);

  useEffect(() => {
    if (tvlParameters) {
      const tvlParser = new TVLParser(decimals, tvlParameters);
      setViewModel(tvlParser.parse());
    }
  }, [decimals, tvlParameters]);

  return {
    viewModel,
  };
}
