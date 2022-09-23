import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { CardText } from '../../YieldFarm/components/YieldFarmStatsView';
import useTVLFarmViewModel from '../screens/useTVLFarmViewModel';

export default function TVLFarmView() {
  const { viewModel } = useTVLFarmViewModel('0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585');
  return <CardText>$ {viewModel}</CardText>;
}
