import { BigNumber } from 'ethers';
import { Pair } from '@firepotfinance/firepotfinance-sdk';
import { formatUnits } from 'ethers/lib/utils';
import { duplicateStableCoin } from './helpers';
import { TVLParameters } from './types';

const PRECISION_MULTIPLIER = 100;

export class TVLParser {
  // TODO: Logic to parse coins with no stable coin pair
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
      console.log(this.pool, 'pool');
      return this.parsePair();
    }
    if (this.tvlParams && this.tvlParams.totalFarmStakedTokens) {
      return this.parseFarm();
    }
    if (this.tvlParams && !this.tvlParams.totalFarmStakedTokens) {
      return this.parseParams();
    }
    return '0';
  }

  private parsePair(): string {
    if (!this.pool) throw new Error('There is no pool available.');

    const duplicatedStableCoin = duplicateStableCoin(
      { address: this.pool.token0.address, reserve: this.pool.reserve0.raw.toString() },
      { address: this.pool.token1.address, reserve: this.pool.reserve1.raw.toString() }
    );

    return Number(formatUnits(duplicatedStableCoin, this.numberOfDecimals)).toFixed(4).toString();
  }

  private parseFarm(): string {
    if (!this.tvlParams) throw new Error('There is no TVL params available.');

    const duplicatedStableCoin = duplicateStableCoin(this.tvlParams.tokenA, this.tvlParams.tokenB);

    const result = BigNumber.from(this.tvlParams.totalFarmStakedTokens)
      .mul(duplicatedStableCoin.mul(PRECISION_MULTIPLIER).div(BigNumber.from(this.tvlParams.totalMintedTokens)))
      .div(PRECISION_MULTIPLIER);

    return Number(formatUnits(result, this.numberOfDecimals)).toFixed(4).toString();
  }

  private parseParams(): string {
    if (!this.tvlParams) throw new Error('There is no TVL params available.');

    const duplicatedStableCoin = duplicateStableCoin(this.tvlParams.tokenA, this.tvlParams.tokenB);

    return Number(formatUnits(duplicatedStableCoin, this.numberOfDecimals)).toFixed(4).toString();
  }
}
