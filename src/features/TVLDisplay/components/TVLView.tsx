import React from 'react';
import useTVLViewModel from './useTVLViewModel';
import { Text } from 'rebass';
import styled from 'styled-components';
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;
export default function TVLView() {
  // '0x015AB9B3771F1748007ea62885737eF4Fa346291','0xfD3aA0C31308cB069F4c7ebB27A556B264c0C763',
  const poolContractAddresses = [''];
  const { viewModel } = useTVLViewModel(poolContractAddresses);
  return (
    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
      $ {viewModel} TVL
    </BalanceText>
  );
}
