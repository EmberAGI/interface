import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AppBody from '../../../legacy/pages/AppBody';
import YieldFarmManageHeader from '../components/YieldFarmManageHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import YieldFarmStatsView from '../components/YieldFarmStatsView';
import { ButtonConfirmed, ButtonError } from 'legacy/components/Button';
import { useParams } from 'react-router-dom';
import useYieldFarmStakeViewModel from './useYieldFarmStakeViewModel';
import { Dots } from '../../../legacy/pages/Pool/styleds';
import CurrencyInputPanel from '../../../libraries/components/CurrencyInputPanel';
import { RowBetween } from '../../../legacy/components/Row';
import { Text } from 'rebass';
import { BottomGrouping } from '../../../legacy/components/swap/styleds';
import config from 'config';

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

interface YieldFarm {
  farmContractAddress: string;
  stakeToken: string;
  rewardToken: string;
  lpAddress: string;
  tokenImg1: string;
  tokenImg2: string;
}

const initialFarmState: YieldFarm = {
  farmContractAddress: '',
  stakeToken: '',
  rewardToken: '',
  lpAddress: '',
  tokenImg1: '',
  tokenImg2: '',
};

export default function YieldFarmStakeView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, setStakeAmount, approve, stake } = useYieldFarmStakeViewModel(stakingTokenAddress);
  const [typedValue, setTypedValue] = useState('');

  const [currentFarm, setCurrentFarm] = useState<YieldFarm | undefined>(initialFarmState);

  useEffect(() => {
    const yieldFarms: YieldFarm[] = [config.yieldFarms.usdc_amb, config.yieldFarms.busd_amb];
    const selectCurrentFarm = () => {
      return yieldFarms.find((farm) => farm.farmContractAddress === stakingTokenAddress);
    };
    const t = selectCurrentFarm();
    setCurrentFarm(t);
  }, [stakingTokenAddress]);

  const onUserInput = (value: string) => {
    setStakeAmount(value);
    setTypedValue(value);
  };
  const onMax = () => {
    setStakeAmount('max');
    setTypedValue(viewModel.unstakedTokens);
  };
  return (
    <AppBody>
      <YieldFarmManageHeader page="stake" farmContractAddress={stakingTokenAddress} />
      <Container>
        {currentFarm && (
          <YieldFarmCardImageTextView
            stakeToken={currentFarm.stakeToken}
            tokenImg1={currentFarm.tokenImg1}
            tokenImg2={currentFarm.tokenImg2}
            rewardToken={currentFarm.rewardToken}
          />
        )}
        <YieldFarmStatsView farmContractAddress={stakingTokenAddress} />
        <hr />
        <CardRow justify="space-between">
          <CardText>Staked</CardText>
          <CardText>
            {viewModel.stakedTokens}
            {currentFarm?.stakeToken}
          </CardText>
        </CardRow>
        <CurrencyInputPanel
          value={typedValue}
          onUserInput={onUserInput}
          label={'Amount'}
          showMaxButton={true}
          onMax={onMax}
          tokenAddress={stakingTokenAddress}
          tokenName={currentFarm?.rewardToken}
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
            <ButtonError onClick={stake} disabled={!viewModel.isApproved} error={viewModel.showAboveBalanceError}>
              <Text fontSize={viewModel.showAboveBalanceError ? 16 : 20} fontWeight={500}>
                {viewModel.showAboveBalanceError ? 'Cannot stake more than your balance' : 'Stake'}
              </Text>
            </ButtonError>
          </RowBetween>
        </BottomGrouping>
      </Container>
    </AppBody>
  );
}
