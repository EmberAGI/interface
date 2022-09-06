import React from 'react';
import styled from 'styled-components';
import AppBody from '../../../legacy/pages/AppBody';
import YieldFarmStakeWithdrawHeaderView from '../components/YieldFarmStakeWithdrawHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import YieldFarmStats from '../components/YieldFarmStatsView';
import { ButtonSecondary } from 'legacy/components/Button';
import { useParams } from 'react-router-dom';
import { useActiveWeb3React } from 'legacy/hooks';
import useYieldFarmStatsViewModel from '../components/useYieldFarmStatsViewModel';

interface CardRowProps {
  justify?: string;
}
const Container = styled.div`
  padding: 1rem;
`;

const CardText = styled.p`
  text-align: right;
  color: black;
  font-size: 14px;
  font-weight: bold;
  line-height: 0px;
`;

const CardRow = styled.div<CardRowProps>`
  display: flex;
  height: 40px;
  justify-content: ${(props: CardRowProps) => (props.justify ? props.justify : 'center')};
`;

const CardRowCenter = styled(CardRow)`
  align-items: center;
  justify-content: center;
`;

const InputAmount = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 10px;
  background: papayawhip;
  border: solid;
  border-radius: 10px;
`;

const StakeAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export default function YieldFarmStakeView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, stake } = useYieldFarmStatsViewModel(stakingTokenAddress);

  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView farmContractAddress={stakingTokenAddress} />
      <Container>
        <YieldFarmCardImageTextView />
        <YieldFarmStats farmContractAddress={stakingTokenAddress} />
        <CardRow justify="space-between">
          <CardText>Balance:</CardText>
          <CardText>69 USDC-AMB</CardText>
        </CardRow>
        <InputAmount />
        <CardRowCenter>
          <StakeAction>Approve</StakeAction>
        </CardRowCenter>
      </Container>
    </AppBody>
  );
}
