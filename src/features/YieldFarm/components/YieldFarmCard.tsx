import React from 'react';
import styled from 'styled-components';
import YieldFarmCardImageTextView from './YieldFarmCardImageText';
import { ButtonPrimary, ButtonSecondary } from 'legacy/components/Button';
import { Text } from 'rebass';
import { Link } from 'react-router-dom';
import YieldFarmStatsView from './YieldFarmStatsView';
import { LightCard } from '../../../legacy/components/Card';

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
  stakeToken: string;
  rewardToken: string;
  lpAddress: string;
  tokenImg1: string;
  tokenImg2: string;
}

export default function YieldFarmCard(props: YieldFarmCardProps) {
  const { farmContractAddress, stakeToken, rewardToken, lpAddress, tokenImg1, tokenImg2 } = props;
  return (
    <StyledPositionCard>
      <YieldFarmCardImageTextView
        stakeToken={stakeToken}
        rewardToken={rewardToken}
        tokenImg1={tokenImg1}
        tokenImg2={tokenImg2}
      />
      <YieldFarmStatsView farmContractAddress={farmContractAddress} />
      <CardSpaceBetweenRow>
        <ResponsiveButtonPrimary as={Link} to={`/stake/${farmContractAddress}`} width="48%">
          <Text>Manage</Text>
        </ResponsiveButtonPrimary>
        <ResponsiveButtonSecondary
          as={Link}
          // REFACTOR - Must populate LP pair dynamically
          to={`/add/AMB/${lpAddress}`}
          width="48%"
        >
          <Text>Add Liquidity</Text>
        </ResponsiveButtonSecondary>
      </CardSpaceBetweenRow>
    </StyledPositionCard>
  );
}
