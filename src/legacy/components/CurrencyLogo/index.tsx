import { Currency, AMBER, Token } from '@firepotfinance/firepotfinance-sdk';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import AirdaoLogo from '../../../assets/images/AirdaoLogo.png';
import useHttpLocations from '../../hooks/useHttpLocations';
import { WrappedTokenInfo } from '../../state/lists/hooks';
import Logo from '../Logo';

const getTokenLogoURL = (token: Currency) => {
  if (token.symbol === 'USDC') {
    return 'https://etherscan.io/token/images/centre-usdc_28.png';
  } else if (token.symbol === 'USDT') {
    return 'https://etherscan.io/token/images/tethernew_32.png';
  }
  return AirdaoLogo;
};

const StyledAmbrosusLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 100px;
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
  size = '29px',
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
        return [...uriLocations, getTokenLogoURL(currency)];
      }

      return [getTokenLogoURL(currency)];
    }
    return [];
  }, [currency, uriLocations]);

  if (currency === AMBER) {
    return <StyledAmbrosusLogo src={AirdaoLogo} size={size} style={style} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
