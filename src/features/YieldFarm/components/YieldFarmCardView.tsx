import React from 'react';
import styled from 'styled-components';
import YieldFarmCardImageTextView from './YieldFarmCardImageTextView';
import { ButtonPrimary } from 'legacy/components/Button';
import { Text } from 'rebass';
import { Link } from 'react-router-dom';
import YieldFarmCardStatsView from './YieldFarmCardStatsView';

export default function YieldFarmCardView() {
  const CardContainer = styled.div`
    display: flex;
    padding: 30px;
    overflow: hidden;
    box-shadow: 5px -4px 10px 0px rgb(151 197 194 / 81%);
    border-radius: 15px;
    flex-direction: column;
    backdrop-filter: blur(10px);
    background-color: rgb(255, 255, 255);
    width: 80%;
  `;

  const CardSpaceBetweenRow = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
  `;

  const ResponsiveButtonPrimary = styled(ButtonPrimary)`
    width: fit-content;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
  `;
  return (
    <CardContainer>
      <YieldFarmCardImageTextView />
      <YieldFarmCardStatsView />
      <CardSpaceBetweenRow>
        <ResponsiveButtonPrimary
          padding="8px"
          as={Link}
          to="/stake/AMB/0xA9646A0281996fDcB88f8f6f01Af52BB0268c494"
          width="48%"
        >
          <Text>Manage</Text>
        </ResponsiveButtonPrimary>
        <ResponsiveButtonPrimary
          padding="8px"
          as={Link}
          to="/add/AMB/0xA9646A0281996fDcB88f8f6f01Af52BB0268c494"
          width="48%"
        >
          <Text>Add Liquidity</Text>
        </ResponsiveButtonPrimary>
      </CardSpaceBetweenRow>
    </CardContainer>
  );
}
