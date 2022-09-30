export interface PoolToken {
  address: string;
  reserve: string;
  decimals: number;
}
export interface TVLParameters {
  tokenA: PoolToken;
  tokenB: PoolToken;
  totalFarmStakedTokens?: string;
  totalMintedTokens?: string;
}
