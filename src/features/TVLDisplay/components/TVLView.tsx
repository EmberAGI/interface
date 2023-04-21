import React from 'react';
import useTVLViewModel from './useTVLViewModel';
import { Text } from 'rebass';
import styled from 'styled-components';
import config from 'config';
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;
export default function TVLView() {
  const { viewModel } = useTVLViewModel(config.pools);
  return (
    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
      $ {viewModel} TVL
    </BalanceText>
  );
}
