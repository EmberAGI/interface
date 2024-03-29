import React, { useState, useEffect } from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';
import YieldFarmManageHeader from '../components/YieldFarmManageHeader';
import YieldFarmCardImageTextView from '../components/YieldFarmCardImageText';
import useYieldFarmWithdrawViewModel from './useYieldFarmWithdrawViewModel';
import CurrencyInputPanel from '../../../libraries/components/CurrencyInputPanel';
import { RowBetween } from '../../../legacy/components/Row';
import { ButtonError, ButtonSecondary } from 'legacy/components/Button';
import { Text } from 'rebass';
import { BottomGrouping } from '../../../legacy/components/swap/styleds';
import { useParams } from 'react-router-dom';
import { TYPE } from '../../../legacy/theme';
import AirdaoLogo from '../../../assets/images/AirdaoLogo.png';
import BusdLogo from '../../../assets/images/BusdLogo.png';
import UsdcLogo from '../../../assets/images/UsdcLogo.png';

const Container = styled.div`
  padding: 1rem;
`;

const CardRowCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem;
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
  tokenImg1: AirdaoLogo,
  tokenImg2: UsdcLogo,
};

export default function YieldFarmWithdrawView() {
  const { stakingTokenAddress } = useParams<{ stakingTokenAddress: string }>();
  const { viewModel, claim, withdrawAndClaim, withdraw, onUserInput, typedValue } =
    useYieldFarmWithdrawViewModel(stakingTokenAddress);

  const onMax = () => {
    onUserInput(viewModel.stakedTokens);
  };
  const [currentFarm, setCurrentFarm] = useState<YieldFarm | undefined>(initialFarmState);

  useEffect(() => {
    const yieldFarms: YieldFarm[] = [
      {
        farmContractAddress: '0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585',
        stakeToken: 'AMB-USDC-flp',
        rewardToken: 'AMB-USDC-flp',
        lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
        tokenImg1: AirdaoLogo,
        tokenImg2: UsdcLogo,
      },
      {
        farmContractAddress: '0xa17DdfBCB5D8304835062324D99bfBd1d5cE4841',
        stakeToken: 'AMB-BUSD-flp',
        rewardToken: 'AMB-BUSD-flp',
        lpAddress: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        tokenImg1: AirdaoLogo,
        tokenImg2: BusdLogo,
      },
    ];
    const selectCurrentFarm = () => {
      return yieldFarms.find((farm) => farm.farmContractAddress === stakingTokenAddress);
    };
    const t = selectCurrentFarm();
    setCurrentFarm(t);
  }, [stakingTokenAddress]);
  return (
    <AppBody>
      <YieldFarmManageHeader page="withdraw" farmContractAddress={stakingTokenAddress} />
      <Container>
        {currentFarm && (
          <YieldFarmCardImageTextView
            tokenImg1={currentFarm.tokenImg1}
            tokenImg2={currentFarm.tokenImg2}
            stakeToken={currentFarm.stakeToken}
            rewardToken={currentFarm.rewardToken}
          />
        )}
        <CardRowCenter>
          <TYPE.black fontWeight={500}>
            Earned <b>{viewModel.earnedTokens}</b>
          </TYPE.black>

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
          tokenName={currentFarm?.rewardToken}
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
