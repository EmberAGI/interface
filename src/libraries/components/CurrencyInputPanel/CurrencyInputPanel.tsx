import { Currency, Pair, Token } from '@firepotfinance/firepotfinance-sdk';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { useCurrencyBalance } from '../../../legacy/state/wallet/hooks';
import { RowBetween } from '../../../legacy/components/Row';
import { TYPE } from '../../../legacy/theme';
import NumericalInput from './NumericalInput';
import { ReactComponent as DropDown } from '../../../legacy/assets/images/dropdown.svg';
import MetamaskIcon from '../../../legacy/assets/images/metamask.png';
import { useActiveWeb3React } from '../../../legacy/hooks';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../legacy/hooks/useTheme';
import { WrappedTokenInfo } from '../../../legacy/state/lists/hooks';
import DoubleCurrencyLogo from '../../../legacy/components/DoubleLogo';
import CurrencyLogo from '../../../legacy/components/CurrencyLogo';
import { useCurrency } from '../../../legacy/hooks/Tokens';
const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.8rem 0.6rem 0.8rem 1.1rem' : '0.8rem 0.8rem 0.8rem 1.1rem')};
`;

const CurrencySelect = styled.button`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  border: none;
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text1};
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  transition: 0.2s;

  :focus,
  :hover {
    background-color: ${({ theme }) => theme.bg4};
  }
`;

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDropDown = styled(DropDown)`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.text1};
    stroke-width: 1.5px;
  }
`;

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
`;

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg3};
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
`;

const StyledBalanceMax = styled.button`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.bg3};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: 0.2s;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};

  :hover {
    background-color: ${({ theme }) => theme.primary3};
  }
  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  tokenAddress?: string;
  tokenName?: string;
  disableCurrencySelect?: boolean;
  balance?: string;
  hideBalance?: boolean;
  hideInput?: boolean;
  id: string;
  customBalanceText?: string;
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  tokenAddress,
  tokenName,
  disableCurrencySelect = false,
  balance,
  hideBalance = false,
  hideInput = false,
  id,
  customBalanceText,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  /*const ethereum = window.ethereum as any;

  const addTokenFunction = async (address: string, symbol: string | undefined) => {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: 18,
          },
        },
      });
      if (wasAdded) {
        console.log('Added token');
      } else {
        console.log('Token was not added');
      }
    } catch (error) {
      console.log(error);
    }
  };*/

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              <TYPE.body
                onClick={onMax}
                color={theme.text2}
                fontWeight={500}
                fontSize={14}
                style={{ display: 'inline', cursor: 'pointer' }}
              >
                {/*!hideBalance && !!currency && balance ? (customBalanceText ?? 'Balance: ') + balance : ' -'*/}
                {!hideBalance && balance ? (customBalanceText ?? 'Balance') + `: ${balance}` : ' -'}
              </TYPE.body>
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val);
                }}
              />
              {/*currency && (currency instanceof WrappedTokenInfo || currency instanceof Token) && (
                <StyledBalanceMax onClick={() => addTokenFunction(currency.address, currency.symbol)}>
                  <img src={MetamaskIcon} alt={'metamask logo'} width={'16px'} height={'16px'} />
                </StyledBalanceMax>
              )*/}
              {showMaxButton && <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>}
            </>
          )}
          <Aligner>
            <StyledTokenName className="token-symbol-container">{tokenName || t('Token')}</StyledTokenName>
          </Aligner>
        </InputRow>
      </Container>
    </InputPanel>
  );
}
