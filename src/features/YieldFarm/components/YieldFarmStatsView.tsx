import React from 'react';
import styled from 'styled-components';
import useYieldFarmStatsViewModel from './useYieldFarmStatsViewModel';
import TVLFarmView from '../../TVLDisplay/components/TVLFarmView';

export const CardText = styled.p`
  text-align: right;
  color: black;
  font-size: 14px;
  font-weight: bold;
  line-height: 0px;
`;

const CardSpaceBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

interface YieldFarmStatsViewProps {
  farmContractAddress: string;
}

export default function YieldFarmStatsView(props: YieldFarmStatsViewProps) {
  const { farmContractAddress } = props;
  const { viewModel } = useYieldFarmStatsViewModel(farmContractAddress);

  return (
    <>
      <CardSpaceBetweenRow>
        <CardText>APR</CardText>
        <CardText>{viewModel.apr}%</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>Daily ROI</CardText>
        <CardText>{viewModel.dailyROI}%</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>TVL</CardText>
        {/*<CardText>{viewModel.tvl}</CardText> */}
        <TVLFarmView farmContractAddress={farmContractAddress} />
      </CardSpaceBetweenRow>
    </>
  );
}
