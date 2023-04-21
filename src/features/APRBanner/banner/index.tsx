import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useYieldFarmStatsViewModel from '../../YieldFarm/components/useYieldFarmStatsViewModel';
import config from 'config';

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

export default function APRBanner() {
  // const busdModel = useYieldFarmStatsViewModel(config.yieldFarms.busd_amb.farmContractAddress);
  const usdcModel = useYieldFarmStatsViewModel(config.yieldFarms.usdc_amb.farmContractAddress);
  const currentTime = Math.floor(Date.now() / 1000);

  return (
    <APRContainer>
      <div>
        <span>
          Stake on our high <Link to="/farm">APR Farms</Link>
        </span>
        &nbsp;- APR: {currentTime < parseInt(usdcModel.viewModel.periodFinish) ? usdcModel.viewModel.apr : '0'}%
      </div>
    </APRContainer>
  );
}
