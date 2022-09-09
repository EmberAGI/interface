import React, { useState } from 'react';
import styled from 'styled-components';
import AppBody from '../../../legacy/pages/AppBody';
import YieldFarmStakeWithdrawHeaderView from '../components/YieldFarmStakeWithdrawHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import YieldFarmStats from '../components/YieldFarmStatsView';
import { ButtonConfirmed, ButtonError, ButtonPrimary, ButtonSecondary } from 'legacy/components/Button';
import { useParams } from 'react-router-dom';
import useYieldFarmStakeViewModel from './useYieldFarmStakeViewModel';
import { Dots } from '../../../legacy/pages/Pool/styleds';
import NumericalInput from '../../../legacy/components/NumericalInput';
import CurrencyInputPanel from '../../../libraries/components/CurrencyInputPanel';
import { useActiveWeb3React } from '../../../legacy/hooks';
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

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.8rem 0.6rem 0.8rem 1.1rem' : '0.8rem 0.8rem 0.8rem 1.1rem')};
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
  const { viewModel, login, setStakeAmount, approve, stake } = useYieldFarmStakeViewModel(stakingTokenAddress);
  const [typedValue, setTypedValue] = useState('');
  const { account } = useActiveWeb3React();

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
          tokenName={'AMB-wUSDC-flp'}
          balance={viewModel.unstakedTokens}
          id="swap-currency-output"
        />
        <BottomGrouping>
          {!account ? (
            <ButtonPrimary onClick={login}>Connect Wallet</ButtonPrimary>
          ) : (
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
          )}
        </BottomGrouping>
      </Container>
    </AppBody>
  );
}
