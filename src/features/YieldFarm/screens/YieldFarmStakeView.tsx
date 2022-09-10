import React, { useState } from 'react';
import styled from 'styled-components';
import AppBody from '../../../legacy/pages/AppBody';
import YieldFarmStakeWithdrawHeaderView from '../components/YieldFarmStakeWithdrawHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import YieldFarmStats from '../components/YieldFarmStatsView';
import { ButtonConfirmed, ButtonError } from 'legacy/components/Button';
import { useParams } from 'react-router-dom';
import useYieldFarmStakeViewModel from './useYieldFarmStakeViewModel';
import { Dots } from '../../../legacy/pages/Pool/styleds';
import CurrencyInputPanel from '../../../libraries/components/CurrencyInputPanel';
import { RowBetween } from '../../../legacy/components/Row';
import { Text } from 'rebass';
import { BottomGrouping } from '../../../legacy/components/swap/styleds';
import { TYPE } from '../../../legacy/theme';

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

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`;

export default function YieldFarmStakeView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, setStakeAmount, approve, stake } = useYieldFarmStakeViewModel(stakingTokenAddress);
  const [typedValue, setTypedValue] = useState('');

  const onUserInput = (value: string) => {
    setStakeAmount(value);
    setTypedValue(value);
  };

  return (
    <AppBody>
      <YieldFarmStakeWithdrawHeaderView page="stake" farmContractAddress={stakingTokenAddress} />
      <Container>
        <TitleRow style={{ marginBottom: '1rem' }}>
          <TYPE.black fontWeight={500}>Yield Farm</TYPE.black>
        </TitleRow>
        <YieldFarmCardImageTextView />
        <YieldFarmStats farmContractAddress={stakingTokenAddress} />
        <hr />
        <CardRow justify="space-between">
          <CardText>Staked</CardText>
          <CardText>{viewModel.stakedTokens} AMB-wUSDC-flp</CardText>
        </CardRow>
        <CurrencyInputPanel
          value={typedValue}
          onUserInput={onUserInput}
          label={'Amount'}
          showMaxButton={false}
          tokenAddress={stakingTokenAddress}
          tokenName={'AMB-USDC-flp'}
          balance={viewModel.unstakedTokens}
          id="swap-currency-output"
        />
        <BottomGrouping>
          <RowBetween>
            {viewModel.showApproval && (
              <ButtonConfirmed
                onClick={approve}
                confirmed={viewModel.isApproved}
                disabled={viewModel.pendingApproval || viewModel.isApproved}
                mr="0.5rem"
                fontWeight={500}
                fontSize={16}
              >
                {viewModel.pendingApproval ? <Dots>Approving</Dots> : viewModel.isApproved ? 'Approved' : 'Approve'}
              </ButtonConfirmed>
            )}
            <ButtonError
              onClick={stake}
              disabled={!viewModel.isApproved}
              //error={!isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]}
            >
              <Text fontSize={16} fontWeight={500}>
                Stake
              </Text>
            </ButtonError>
          </RowBetween>
        </BottomGrouping>
      </Container>
    </AppBody>
  );
}
