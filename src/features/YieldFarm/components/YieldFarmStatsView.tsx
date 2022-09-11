import React from 'react';
import styled from 'styled-components';
import useYieldFarmStatsViewModel from './useYieldFarmStatsViewModel';

const CardText = styled.p`
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

interface YieldFarmStatsProps {
  farmContractAddress: string;
}

export default function YieldFarmStats(props: YieldFarmStatsProps) {
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
        <CardText>{viewModel.tvl}</CardText>
      </CardSpaceBetweenRow>
    </>
  );
}
