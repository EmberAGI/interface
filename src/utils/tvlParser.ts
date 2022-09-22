import { BigNumber } from 'ethers';
import { Pair } from '@firepotfinance/firepotfinance-sdk';
import { formatUnits } from 'ethers/lib/utils';

const STABLE_COINS_ADDRESSES = ['0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805'];

export interface PoolToken {
  address: string;
  reserve: string;
}
export interface TVLParameters {
  tokenA: PoolToken;
  tokenB: PoolToken;
  totalFarmStakedTokens: string;
  totalMintedTokens: string;
}
function duplicateStableCoin(tokenAmount: string): string {
  return BigNumber.from(tokenAmount).mul(2).toString();
}

function getStableCoinReserve(tokenA: PoolToken, tokenB: PoolToken): string {
  let result = '0';

  if (STABLE_COINS_ADDRESSES.includes(tokenA.address)) {
    result = tokenA.reserve;
  }
  if (STABLE_COINS_ADDRESSES.includes(tokenB.address)) {
    result = tokenB.reserve;
  }

  return result;
}
export class TVLParser {
  pool: Pair | undefined;
  tvlParams: TVLParameters | undefined;
  numberOfDecimals: number;

  constructor(numberOfDecimals: number, pool?: Pair, tvlParams?: TVLParameters) {
    this.pool = pool;
    this.tvlParams = tvlParams;
    this.numberOfDecimals = numberOfDecimals;
  }

  parse(): string {
    if (this.pool) {
      return this.parsePool();
    }
    return this.parseTotalReserve();
  }

  private parsePool(): string {
    if (!this.pool) throw new Error('There is no pool available.');

    const tvlInStableCoin = duplicateStableCoin(
      getStableCoinReserve(
        { address: this.pool.token0.address, reserve: this.pool.reserve0.raw.toString() },
        { address: this.pool.token1.address, reserve: this.pool.reserve1.raw.toString() }
      )
    );

    // TODO: Logic to parse coins with no stable coin pair

    return Number(formatUnits(BigNumber.from(tvlInStableCoin), this.numberOfDecimals))
      .toFixed(8)
      .toString();
  }

  private parseTotalReserve(): string {
    if (!this.tvlParams) throw new Error('There is no TVL params available.');

    const duplicatedStableCoin = duplicateStableCoin(
      getStableCoinReserve(
        { address: this.tvlParams.tokenA.address, reserve: this.tvlParams.tokenA.reserve },
        { address: this.tvlParams.tokenB.address, reserve: this.tvlParams.tokenB.reserve }
      )
    );

    const result = BigNumber.from(this.tvlParams.totalFarmStakedTokens).mul(
      BigNumber.from(duplicatedStableCoin).div(BigNumber.from(this.tvlParams.totalMintedTokens))
    );

    return Number(formatUnits(BigNumber.from(result), this.numberOfDecimals))
      .toFixed(8)
      .toString();
  }
}
