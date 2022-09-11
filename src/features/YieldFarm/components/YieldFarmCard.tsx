import React from 'react';
import styled from 'styled-components';
import YieldFarmCardImageTextView from './YieldFarmCardImageText';
import { ButtonPrimary, ButtonSecondary } from 'legacy/components/Button';
import { Text } from 'rebass';
import { Link } from 'react-router-dom';
import YieldFarmStats from './YieldFarmStatsView';
import { LightCard } from '../../../legacy/components/Card';

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
  gap: 1rem;
  justify-content: space-evenly;
  height: 40px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  gap: 0.5rem;
  `};
`;

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  padding: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.85rem;
  `};
`;

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  padding: 8px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.85rem;
  `};
`;

const StyledPositionCard = styled(LightCard)`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.primary1};
  background: ${({ theme }) => theme.bg1};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 20px;
  `};
`;

interface YieldFarmCardProps {
  farmContractAddress: string;
}

export default function YieldFarmCard(props: YieldFarmCardProps) {
  const { farmContractAddress } = props;
  return (
    <StyledPositionCard>
      <YieldFarmCardImageTextView />
      <YieldFarmStats farmContractAddress={farmContractAddress} />
      <CardSpaceBetweenRow>
        <ResponsiveButtonPrimary as={Link} to={`/stake/${farmContractAddress}`} width="48%">
          <Text>Manage</Text>
        </ResponsiveButtonPrimary>
        <ResponsiveButtonSecondary
          as={Link}
          // REFACTOR - Must populate LP pair dynamically
          to="/add/AMB/0xA9646A0281996fDcB88f8f6f01Af52BB0268c494"
          width="48%"
        >
          <Text>Add Liquidity</Text>
        </ResponsiveButtonSecondary>
      </CardSpaceBetweenRow>
    </StyledPositionCard>
  );
}
