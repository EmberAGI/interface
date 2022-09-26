import { BigNumber } from 'ethers';
import { PoolToken } from './types';

const STABLE_COINS_ADDRESSES = ['0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805'];

export function duplicateToken(tokenAmount: string): string {
  return BigNumber.from(tokenAmount).mul(2).toString();
}

export function getStableCoinReserve(tokenA: PoolToken, tokenB: PoolToken): string {
  let result = '0';

  if (STABLE_COINS_ADDRESSES.includes(tokenA.address)) {
    result = tokenA.reserve;
  }
  if (STABLE_COINS_ADDRESSES.includes(tokenB.address)) {
    result = tokenB.reserve;
  }

  return result;
}

export function duplicateStableCoin(tokenA: PoolToken, tokenB: PoolToken): BigNumber {
  return BigNumber.from(
    duplicateToken(
      getStableCoinReserve(
        { address: tokenA.address, reserve: tokenA.reserve },
        { address: tokenB.address, reserve: tokenB.reserve }
      )
    )
  );
}
