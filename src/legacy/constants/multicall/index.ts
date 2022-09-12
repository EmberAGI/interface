import { ChainId } from '@firepotfinance/firepotfinance-sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.AMBTEST]: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
