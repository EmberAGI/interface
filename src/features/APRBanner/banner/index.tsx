import React from 'react';
import styled from 'styled-components';
import useYieldFarmStatsViewModel from '../../YieldFarm/components/useYieldFarmStatsViewModel';

const APRContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 50px;
  background-color: white;
  border-radius: 16px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.9em;

    span {
      font-weight: bold;
    }
  }
`;

interface APRBannerProps {
  apr: string;
}

export default function APRBanner() {
  const { viewModel } = useYieldFarmStatsViewModel('0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585');

  return (
    <APRContainer>
      <div>
        <span>Stake on our high APR Farms </span>&nbsp;- APR: {viewModel.apr}%
      </div>
    </APRContainer>
  );
}
