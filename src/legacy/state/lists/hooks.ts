import { toChecksumAddress } from 'web3-utils';
import DEFAULT_TOKEN_LIST from '@firepotfinance/default-token-list';
import { ChainId, Token } from '@firepotfinance/firepotfinance-sdk';
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../index';
import sortByListPriority from '../../utils/listSort';

type TagDetails = Tags[keyof Tags];
export interface TagInfo extends TagDetails {
  id: string;
}

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo;
  public readonly tags: TagInfo[];
  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(
      tokenInfo.chainId,
      toChecksumAddress(tokenInfo.address),
      tokenInfo.decimals,
      tokenInfo.symbol,
      tokenInfo.name
    );
    this.tokenInfo = tokenInfo;
    this.tags = tags;
  }
  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI;
  }
}

export type TokenAddressMap = Readonly<
  { [chainId in ChainId]: Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList } }> }
>;

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.AMBTEST]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.MAINNET]: {},
};

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, TokenAddressMap>() : null;

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const tags: TagInfo[] =
        tokenInfo.tags
          ?.map((tagId) => {
            if (!list.tags?.[tagId]) return undefined;
            return { ...list.tags[tagId], id: tagId };
          })
          ?.filter((x): x is TagInfo => Boolean(x)) ?? [];
      const token = new WrappedTokenInfo(tokenInfo, tags);
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.');
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: {
            token,
            list: list,
          },
        },
      };
    },
    { ...EMPTY_LIST }
  );
  listCache?.set(list, map);
  return map;
}

export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null;
    readonly pendingUpdate: TokenList | null;
    readonly loadingRequestId: string | null;
    readonly error: string | null;
  };
} {
  return useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl);
}

function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  return {
    16718: { ...map1[16718], ...map2[16718] },
    3: { ...map1[3], ...map2[3] },
    4: { ...map1[4], ...map2[4] },
    5: { ...map1[5], ...map2[5] },
    22040: { ...map1[22040], ...map2[22040] },
  };
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls: string[] | undefined): TokenAddressMap {
  const lists = useAllLists();

  return useMemo(() => {
    if (!urls) return EMPTY_LIST;

    return (
      urls
        .slice()
        // sort by priority so top priority goes last
        .sort(sortByListPriority)
        .reduce((allTokens, currentUrl) => {
          const current = lists[currentUrl]?.current;
          if (!current) return allTokens;
          try {
            const newTokens = Object.assign(listToTokenMap(current));
            return combineMaps(allTokens, newTokens);
          } catch (error) {
            console.error('Could not show token list due to error', error);
            return allTokens;
          }
        }, EMPTY_LIST)
    );
  }, [lists, urls]);
}
// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  //return useSelector<AppState, AppState['lists']['activeListUrls']>((state) => state.lists.activeListUrls);
  const json = {
    name: 'Uniswap Labs Default',
    timestamp: '2022-06-29T15:57:01.868Z',
    version: {
      major: 4,
      minor: 1,
      patch: 0,
    },
    tags: {},
    logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
    keywords: ['uniswap', 'default'],
    tokens: [
      {
        chainId: 22040,
        address: '0x8FB30d1A78d7E622CCB10376A585383Cf9dEc920',
        name: 'BigToken',
        symbol: 'BIG',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/12390/thumb/ACH_%281%29.png?1599691266',
      },
      {
        chainId: 22040,
        address: '0xD45f1F799097a30243605E9ba938FcB0e3f5cBC3',
        name: 'SmallToken',
        symbol: 'SML',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/4490/thumb/aergo.png?1647696770',
      },
    ],
  };
  return [JSON.stringify(json)];
}

export function useInactiveListUrls(): string[] {
  const json = {
    name: 'Uniswap Labs Default',
    timestamp: '2022-06-29T15:57:01.868Z',
    version: {
      major: 4,
      minor: 1,
      patch: 0,
    },
    tags: {},
    logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
    keywords: ['uniswap', 'default'],
    tokens: [
      {
        chainId: 22040,
        address: '0x8FB30d1A78d7E622CCB10376A585383Cf9dEc920',
        name: 'BigToken',
        symbol: 'BIG',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/12390/thumb/ACH_%281%29.png?1599691266',
      },
      {
        chainId: 22040,
        address: '0xD45f1F799097a30243605E9ba938FcB0e3f5cBC3',
        name: 'SmallToken',
        symbol: 'SML',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/4490/thumb/aergo.png?1647696770',
      },
    ],
  };
  return [JSON.stringify(json)];
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeListUrls = useActiveListUrls();
  const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
  const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST);
  return combineMaps(activeTokens, defaultTokenMap);
}

// all tokens from inactive lists
export function useCombinedInactiveList(): TokenAddressMap {
  const allInactiveListUrls: string[] = useInactiveListUrls();
  return useCombinedTokenMapFromUrls(allInactiveListUrls);
}

// used to hide warnings on import for default tokens
export function useDefaultTokenList(): TokenAddressMap {
  return listToTokenMap(DEFAULT_TOKEN_LIST);
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls();
  return Boolean(activeListUrls?.includes(url));
}
