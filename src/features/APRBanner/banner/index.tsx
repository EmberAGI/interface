import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  const { viewModel } = useYieldFarmStatsViewModel('0xa17DdfBCB5D8304835062324D99bfBd1d5cE4841');

  return (
    <APRContainer>
      <div>
        <span>
          Stake on our high <Link to="/farm">APR Farms</Link>
        </span>
        &nbsp;- APR: {viewModel.apr}%
      </div>
    </APRContainer>
  );
}
