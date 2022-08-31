import React from 'react';
import styled from 'styled-components';
import AppBody from '../../legacy/pages/AppBody';
import YieldFarmStakeWithdrawHeaderView from './components/YieldFarmStakeWithdrawHeaderView';
import YieldFarmCardImageTextView from './components/YieldFarmCardImageTextView';
import YieldFarmCardStatsView from './components/YieldFarmCardStatsView';
import { ButtonSecondary } from 'legacy/components/Button';

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
  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView />
      <Container>
        <YieldFarmCardImageTextView />
        <YieldFarmCardStatsView />
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
