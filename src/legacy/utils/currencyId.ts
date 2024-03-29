import { Currency, AMBER, Token } from '@firepotfinance/firepotfinance-sdk';

export function currencyId(currency: Currency): string {
  if (currency === AMBER) return 'AMB';
  if (currency instanceof Token) return currency.address;
  throw new Error('invalid currency');
}
