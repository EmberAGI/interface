import { BigNumber, Contract } from 'ethers';
import { PoolToken, TVLParameters } from './types';

const STABLE_COINS_ADDRESSES = [
  '0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805',
  '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
];

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
        { address: tokenA.address, reserve: tokenA.reserve, decimals: tokenA.decimals },
        { address: tokenB.address, reserve: tokenB.reserve, decimals: tokenB.decimals }
      )
    )
  );
}

export function checkTokenDecimals(token: PoolToken): boolean {
  if (token.decimals === 18) {
    return true;
  }
  return false;
}

export function standarizeTokenDecimals(token: PoolToken): PoolToken {
  const power = BigNumber.from(10).pow(18 - token.decimals);
  const newReserve = BigNumber.from(token.reserve).mul(power);
  return { address: token.address, reserve: newReserve.toString(), decimals: 18 };
}

export async function setupTVLParams(
  contract: Contract,
  tokenADecimals?: number,
  tokenBDecimals?: number
): Promise<TVLParameters> {
  const tokenA: PoolToken = { address: '', reserve: '', decimals: tokenADecimals || 18 };
  const tokenB: PoolToken = { address: '', reserve: '', decimals: tokenBDecimals || 18 };
  const reserves = await contract.getReserves();
  tokenA.reserve = BigNumber.from(reserves[0]).toString();
  tokenB.reserve = BigNumber.from(reserves[1]).toString();
  const addressToken0 = await contract?.token0();
  tokenA.address = addressToken0;
  const addressToken1 = await contract?.token1();
  tokenB.address = addressToken1;
  const params = {
    tokenA,
    tokenB,
  };

  return params;
}
