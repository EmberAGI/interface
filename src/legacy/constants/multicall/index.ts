import { ChainId } from '@firepotfinance/firepotfinance-sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
  [ChainId.AMBTEST]: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
