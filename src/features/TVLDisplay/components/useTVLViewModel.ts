import { useState, useEffect } from 'react';
import usePairReserves from '../hooks/usePairReserves';
import { TVLParser } from '../../../libraries/TVLParser';

export default function useTVLViewModel(poolContractAddresses: string[]) {
  const [viewModel, setViewModel] = useState<string>('');
  const { tvlParameters: tvlParamsPool1, decimals: decimalsPool1 } = usePairReserves?.(poolContractAddresses[0]);
  const { tvlParameters: tvlParamsPool2, decimals: decimalsPool2 } = usePairReserves?.(poolContractAddresses[1]);

  useEffect(() => {
    if (tvlParamsPool1 && tvlParamsPool2) {
      const tvlParser1 = new TVLParser(decimalsPool1, tvlParamsPool1);
      const tvlPool1 = tvlParser1.parse();
      const tvlParser2 = new TVLParser(decimalsPool2, tvlParamsPool2);
      const tvlPool2 = tvlParser2.parse();
      setViewModel((Number(tvlPool1) + Number(tvlPool2)).toFixed(4));
    }
  }, [decimalsPool1, tvlParamsPool1, decimalsPool2, tvlParamsPool2]);

  return {
    viewModel,
  };
}
