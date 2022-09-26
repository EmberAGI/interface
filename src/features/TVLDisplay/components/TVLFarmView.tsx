import React from 'react';
import { CardText } from '../../YieldFarm/components/YieldFarmStatsView';
import useTVLFarmViewModel from './useTVLFarmViewModel';

interface FarmContractAddress {
  farmContractAddress: string;
}

export default function TVLFarmView(props: FarmContractAddress) {
  const { farmContractAddress } = props;
  const { viewModel } = useTVLFarmViewModel(farmContractAddress);
  return <CardText>$ {viewModel}</CardText>;
}
