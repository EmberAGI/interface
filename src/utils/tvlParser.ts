import { Pair, TokenAmount } from "@firepotfinance/firepotfinance-sdk";

export class TVLParser {
    static STABLE_COINS_ADDRESSES = ["0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805"];

    static parse(pool: Pair): BigInt  {
        const tokenAReserve = pool.reserve0;
        const tokenBReserve = pool.reserve1;

        if (this.STABLE_COINS_ADDRESSES.includes(pool.token0.address)) {
            return this.duplicateStableCoin(tokenAReserve);
        }
        if (this.STABLE_COINS_ADDRESSES.includes(pool.token1.address)) {
            return this.duplicateStableCoin(tokenBReserve);
        }

        // TODO: Logic to parse coins with no stable coin pair        
        return BigInt(0);
    }


    private static duplicateStableCoin(token: TokenAmount): BigInt {
        return BigInt(token.raw.toString()) * BigInt(2);
    }
}