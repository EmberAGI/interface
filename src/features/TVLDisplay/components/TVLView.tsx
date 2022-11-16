import React from 'react';
import { CardText } from '../../YieldFarm/components/YieldFarmStatsView';
import useTVLViewModel from './useTVLViewModel';
import { Text } from 'rebass';
import styled from 'styled-components';
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;
export default function TVLView() {
  //Refactor to grab this from redux state
  const poolContractAddress = '0x015AB9B3771F1748007ea62885737eF4Fa346291';
  const { viewModel } = useTVLViewModel(poolContractAddress);
  return (
    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
      $ {viewModel} TVL
    </BalanceText>
  );
}
