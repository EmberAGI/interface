import React from 'react';
import { CardText } from '../../YieldFarm/components/YieldFarmStatsView';
import useTVLViewModel from './useTVLViewModel';

export default function TVLView() {
    //Refactor to grab this from redux state
    const poolContractAddress = '0x015AB9B3771F1748007ea62885737eF4Fa346291';
    const { viewModel } = useTVLViewModel(poolContractAddress);
    return <CardText>$ {viewModel}</CardText>;
}
