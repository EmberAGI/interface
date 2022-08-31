import React from 'react';
import styled from 'styled-components';

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
interface YieldFarmStats {
  TVL: string;
  APR: any;
  DROI: string;
}
export default function YieldFarmCardStatsView(prop: YieldFarmStats) {
  const { TVL, APR, DROI } = prop;
  return (
    <>
      <CardSpaceBetweenRow>
        <CardText>APR</CardText>
        <CardText>{APR}</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>Daily ROI</CardText>
        <CardText>{DROI}</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>TVL</CardText>
        <CardText>{TVL}</CardText>
      </CardSpaceBetweenRow>
    </>
  );
}
