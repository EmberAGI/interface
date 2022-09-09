import React from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';
import YieldFarmStakeWithdrawHeaderView from '../components/YieldFarmStakeWithdrawHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import useYieldFarmWithdrawViewModel from './useYieldFarmWithdrawViewModel';
import { ButtonSecondary } from 'legacy/components/Button';
import YieldFarmCardStats from '../components/YieldFarmStatsView';
import useYieldFarmUserPostion from '../hooks/useYieldFarmUserPosition';
import { useParams } from 'react-router-dom';

interface CardRowProps {
  justify?: string;
}
const Container = styled.div`
  padding: 1rem;
`;
const InputAmount = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 10px;
  background: papayawhip;
  border: solid;
  border-radius: 10px;
`;

const ActionButton = styled(ButtonSecondary)`
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
export default function YieldFarmWithdrawView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, claim, withdrawAndClaim, withdraw } = useYieldFarmWithdrawViewModel(stakingTokenAddress);
  //const { userStakeBalance, userEarnedRewards, claim, withdrawAndClaim } = useYieldFarmUserPostion(stakingTokenAddress);
  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView page="withdraw" farmContractAddress={stakingTokenAddress} />
      <Container>
        <YieldFarmCardImageTextView />
        <YieldFarmCardStats farmContractAddress={stakingTokenAddress} />
        <CardRow justify="space-between">
          <CardText>Deposited:</CardText>
          <CardText>{viewModel.stakedTokens}</CardText>
        </CardRow>
        <InputAmount />
        <CardRowCenter>
          <ActionButton>Withdraw</ActionButton>
        </CardRowCenter>
        <CardRow justify="space-between">
          <CardText>Earned:</CardText>
          <CardText>{viewModel.earnedTokens}</CardText>
        </CardRow>
        <CardRowCenter>
          <ActionButton onClick={() => claim()}>Claim Rewards</ActionButton>
        </CardRowCenter>
        <CardRowCenter>
          <ActionButton onClick={() => withdrawAndClaim()}>Exit Position</ActionButton>
        </CardRowCenter>
      </Container>
    </AppBody>
  );
}
