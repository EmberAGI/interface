import React from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';
import YieldFarmStakeWithdrawHeaderView from '../components/YieldFarmStakeWithdrawHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import useYieldFarmWithdrawViewModel from './useYieldFarmWithdrawViewModel';
import CurrencyInputPanel from '../../../libraries/components/CurrencyInputPanel';
import { RowBetween } from '../../../legacy/components/Row';
import { ButtonError, ButtonSecondary } from 'legacy/components/Button';
import { Text } from 'rebass';
import { BottomGrouping } from '../../../legacy/components/swap/styleds';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 1rem;
`;

const CardText = styled.p`
  text-align: right;
  color: black;
  font-size: 18px;
  font-weight: bold;
  line-height: 0px;
`;

const CardRowCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem;
`;

export default function YieldFarmWithdrawView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, claim, withdrawAndClaim, withdraw, onUserInput, typedValue } =
    useYieldFarmWithdrawViewModel(stakingTokenAddress);

  const onMax = () => {
    onUserInput(viewModel.stakedTokens);
  };

  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView page="withdraw" farmContractAddress={stakingTokenAddress} />
      <Container>
        <YieldFarmCardImageTextView />
        <CardRowCenter>
          <CardText>Earned {viewModel.earnedTokens}</CardText>
          <ButtonSecondary onClick={claim} style={{ width: 'fit-content' }}>
            Claim
          </ButtonSecondary>
        </CardRowCenter>
        <CurrencyInputPanel
          value={typedValue}
          onUserInput={onUserInput}
          label={'Amount'}
          showMaxButton={true}
          onMax={onMax}
          tokenAddress={stakingTokenAddress}
          tokenName={'AMB-USDC-flp'}
          balance={viewModel.stakedTokens}
          customBalanceText={'Staked'}
          id="swap-currency-output"
        />{' '}
        <BottomGrouping>
          <RowBetween style={{ margin: '0.75rem 0' }}>
            <ButtonError onClick={withdraw} error={viewModel.showAboveStakeError}>
              <Text fontSize={viewModel.showAboveStakeError ? 16 : 20} fontWeight={500}>
                {viewModel.showAboveStakeError ? 'Cannot withdraw more than you have staked' : 'Withdraw'}
              </Text>
            </ButtonError>
          </RowBetween>
          {!viewModel.showAboveStakeError && (
            <RowBetween style={{ margin: '0.75rem 0' }}>
              <ButtonSecondary onClick={withdrawAndClaim}>Withdraw & Claim</ButtonSecondary>
            </RowBetween>
          )}
        </BottomGrouping>
      </Container>
    </AppBody>
  );
}
