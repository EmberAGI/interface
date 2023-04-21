import { Currency, CurrencyAmount, AMBER, Token, TokenAmount } from '@firepotfinance/firepotfinance-sdk';
import { ChainId } from 'types';
import { WETH } from '../../libraries/sdk';

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === AMBER ? WETH[chainId] : currency instanceof Token ? currency : undefined;
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined;
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined;
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId as unknown as ChainId])) return AMBER;
  return token;
}
