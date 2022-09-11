import { useState, useEffect } from 'react';

export default function useStakingTokenName(contractAddress: string) {
  const [name, setName] = useState<string>();

  useEffect(() => {
    setName('AMB-USDc-flp');
  }, []);

  return name;
}
