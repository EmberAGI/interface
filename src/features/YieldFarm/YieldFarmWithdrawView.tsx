import React from 'react';
import AppBody from '../../legacy/pages/AppBody';
import styled from 'styled-components';
import YieldFarmStakeWithdrawHeaderView from './components/YieldFarmStakeWithdrawHeaderView';
import YieldFarmCardImageTextView from './components/YieldFarmCardImageTextView';
import { ButtonSecondary } from 'legacy/components/Button';
import YieldFarmCardStatsView from './components/YieldFarmCardStatsView';

interface CardRowProps {
  justify?: string;
}
export default function YieldFarmWithdrawView() {
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
  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView />
      <YieldFarmCardImageTextView />
      <YieldFarmCardStatsView />
      <CardRow justify="space-between">
        <CardText>Deposited:</CardText>
        <CardText>69 USDC-AMB</CardText>
      </CardRow>
      <InputAmount />
      <CardRowCenter>
        <StakeAction>Withdraw</StakeAction>
      </CardRowCenter>
    </AppBody>
  );
}
