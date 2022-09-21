import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import usePairReserves from '../hooks/usePairReservers';

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

export default function TVLView() {
  usePairReserves('0x015AB9B3771F1748007ea62885737eF4Fa346291');
  return (
    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
      20
    </BalanceText>
  );
}
