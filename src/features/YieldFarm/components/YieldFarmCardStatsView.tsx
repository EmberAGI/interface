import React from 'react';
import styled from 'styled-components';

export default function YieldFarmCardStatsView() {
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

  return (
    <>
      <CardSpaceBetweenRow>
        <CardText>APR</CardText>
        <CardText>69</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>Daily ROI</CardText>
        <CardText>69%</CardText>
      </CardSpaceBetweenRow>
      <CardSpaceBetweenRow>
        <CardText>TVL</CardText>
        <CardText>69</CardText>
      </CardSpaceBetweenRow>
    </>
  );
}
