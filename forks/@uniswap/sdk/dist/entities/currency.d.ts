/**
 * A currency is any fungible financial instrument on Ethereum, including Amber and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Amber.
 */
export declare class Currency {
  readonly decimals: number
  readonly symbol?: string
  readonly name?: string
  /**
   * The only instance of the base class `Currency`.
   */
  static readonly AMBER: Currency
  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.AMBER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string)
}
declare const AMBER: Currency
export { AMBER }
