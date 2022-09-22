import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import usePairReserves from '../hooks/usePairReserves';

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

export default function TVLView() {
  usePairReserves('0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585');
  return (
    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
      20
    </BalanceText>
  );
}
