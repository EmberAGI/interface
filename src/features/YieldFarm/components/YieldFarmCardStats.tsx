import React from 'react';
import styled from 'styled-components';
import useYieldFarmStats from '../useYieldFarmStats';

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

interface YieldFarmCardStatsProps {
  farmContractAddress: string;
}

export default function YieldFarmCardStats(props: YieldFarmCardStatsProps) {
  const { farmContractAddress } = props;
  const stats = useYieldFarmStats(farmContractAddress);

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
