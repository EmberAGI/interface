import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { CardText } from '../../YieldFarm/components/YieldFarmStatsView';
import useTVLFarmViewModel from '../screens/useTVLFarmViewModel';

interface FarmContractAddress {
  farmContractAddress: string;
}

export default function TVLFarmView(props: FarmContractAddress) {
  const { farmContractAddress } = props;
  const { viewModel } = useTVLFarmViewModel(farmContractAddress);
  return <CardText>$ {viewModel}</CardText>;
}
