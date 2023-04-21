import { BigNumber } from 'ethers';
import { Pair } from '../entities/Pair';
import { formatUnits } from 'ethers/lib/utils';
import { checkTokenDecimals, duplicateStableCoin, standarizeTokenDecimals } from './helpers';
import { TVLParameters } from './types';

const PRECISION_MULTIPLIER = 100;
const DECIMAL_POINTS = 4;

export class TVLParser {
  // TODO: Logic to parse coins with no stable coin pair
  pool: Pair | undefined;
  params: TVLParameters;
  numberOfDecimals: number;

  constructor(numberOfDecimals: number, tvlParams: TVLParameters) {
    this.params = tvlParams;
    this.numberOfDecimals = numberOfDecimals;

    if (!checkTokenDecimals(this.params.tokenA)) this.params.tokenA = standarizeTokenDecimals(this.params.tokenA);
    if (!checkTokenDecimals(this.params.tokenB)) this.params.tokenB = standarizeTokenDecimals(this.params.tokenB);
  }

  parse(): string {
    if (this.params.totalFarmStakedTokens) {
      return this.parseFarm();
    }
    return this.parseParams();
  }

  private parseFarm(): string {
    const duplicatedStableCoin = duplicateStableCoin(this.params.tokenA, this.params.tokenB);

    const result = BigNumber.from(this.params.totalFarmStakedTokens)
      .mul(duplicatedStableCoin.mul(PRECISION_MULTIPLIER).div(BigNumber.from(this.params.totalMintedTokens)))
      .div(PRECISION_MULTIPLIER);

    return Number(formatUnits(result, this.numberOfDecimals)).toFixed(DECIMAL_POINTS).toString();
  }

  private parseParams(): string {
    const duplicatedStableCoin = duplicateStableCoin(this.params.tokenA, this.params.tokenB);

    return Number(formatUnits(duplicatedStableCoin, this.numberOfDecimals)).toFixed(DECIMAL_POINTS).toString();
  }
}
