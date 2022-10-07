import { useState, useEffect } from 'react';
import usePairReserves from '../hooks/usePairReserves';
import { TVLParser } from '../../../libraries/TVLParser';

export default function useTVLViewModel(poolContractAddress: string) {
  const [viewModel, setViewModel] = useState<string>('');
  const { tvlParameters, decimals } = usePairReserves?.(poolContractAddress);

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
