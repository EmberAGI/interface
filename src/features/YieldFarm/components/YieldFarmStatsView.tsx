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
  const stats = useYieldFarmStatsViewModel(farmContractAddress);

  return (
    <>
      <CardSpaceBetweenRow>
        <CardText>APR</CardText>
        <CardText>{stats.apr}</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>Daily ROI</CardText>
        <CardText>{stats.dailyROI}</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>TVL</CardText>
        <CardText>{stats.tvl}</CardText>
      </CardSpaceBetweenRow>
    </>
  );
}
