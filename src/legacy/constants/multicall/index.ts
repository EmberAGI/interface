import { ChainId } from 'types';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
  [ChainId.AMBTEST]: '0xc18b9a12d9C06b7a44CCF884ECD57EB0D3754f09',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
