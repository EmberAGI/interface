export interface PoolToken {
  address: string;
  reserve: string;
}
export interface TVLParameters {
  tokenA: PoolToken;
  tokenB: PoolToken;
  totalFarmStakedTokens?: string;
  totalMintedTokens?: string;
}
