import { Currency, AMBER, Token } from '@firepotfinance/firepotfinance-sdk';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import AmbrosusLogo from '../../assets/images/ambrosusLogo.png';
import useHttpLocations from '../../hooks/useHttpLocations';
import { WrappedTokenInfo } from '../../state/lists/hooks';
import Logo from '../Logo';

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

const StyledAmbrosusLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 1px;
`;

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency;
  size?: string;
  style?: React.CSSProperties;
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);

  const srcs: string[] = useMemo(() => {
    if (currency === AMBER) return [];

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)];
      }

      return [getTokenLogoURL(currency.address)];
    }
    return [];
  }, [currency, uriLocations]);

  if (currency === AMBER) {
    return <StyledAmbrosusLogo src={AmbrosusLogo} size={size} style={style} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
