import { Currency, Pair, Token } from '@firepotfinance/firepotfinance-sdk';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { RowBetween } from '../Row';
import { TYPE } from '../../theme';
import { Input as NumericalInput } from '../NumericalInput';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';
import MetamaskIcon from '../../assets/images/metamask.png';
import { useActiveWeb3React } from '../../hooks';
import { useTranslation } from 'react-i18next';
import useTheme from '../../hooks/useTheme';
import { WrappedTokenInfo } from '../../state/lists/hooks';
const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => '0 16px'};
`;

const CurrencySelect = styled.button`
  align-items: center;
  height: 48px;
  font-size: 20px;
  font-weight: 500;
  border: none;
  color: ${({ theme }) => 'rgba(14, 14, 14, 0.6)'};
  border-radius: 12px;
  outline: none;
  background: ${({ theme }) => 'white'};
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0;
  transition: 0.2s;
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
  height: 35%;

  path {
    stroke: ${({ theme }) => 'rgba(14, 14, 14, 0.60)'};
    stroke-width: 1.5px;
  }
`;

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 85px;
  background-color: ${({ theme }) => theme.white};
  z-index: 1;
`;

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg3};
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? 'margin: 0 4px 0 8px' : 'margin: 0 4px 0 0;')};
  font-size:  ${({ active }) => '16px'};
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
`;

const StyledLabel = styled.span`
  color: var(--neutral-900, #0E0E0E);
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;
  margin-bottom: 8px;
`;

const StyleBalance = styled.span`
  color: var(--alpha-black-60, rgba(14, 14, 14, 0.60));
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  margin-top: 8px;
`;

const StyledMax = styled.span`
  color: var(--blue-500, #457EFF);
  font-family: Inter, sans-serif;
  font-size: 14px;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.14px;
  margin-left: 4px;
`;

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect?: (currency: Currency) => void;
  currency?: Currency | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  hideInput?: boolean;
  otherCurrency?: Currency | null;
  id: string;
  showCommonBases?: boolean;
  customBalanceText?: string;
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = '',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
  const theme = useTheme();
  const ethereum = window.ethereum as any;
  const addTokenFunction = async (address: string, symbol: string | undefined, decimals: number) => {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: decimals,
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
  };
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <>
      <StyledLabel>
        {label}
      </StyledLabel>
      <InputPanel id={id} style={!account ? {pointerEvents: 'none'} : {}}>
        <Container hideInput={hideInput}>
          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
            <CurrencySelect
              className="open-currency-select-button"
              onClick={() => {
                if (!disableCurrencySelect) {
                  setModalOpen(true);
                }
              }}
            >
              <Aligner>
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size={'24px'} />
                ) : null}
                {pair ? (
                  <StyledTokenName className="pair-name-container">
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </StyledTokenName>
                ) : (
                  <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? currency.symbol.slice(0, 4) +
                        '...' +
                        currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                      : currency?.symbol) || t('Token')}
                  </StyledTokenName>
                )}
                {!disableCurrencySelect && <StyledDropDown />}
              </Aligner>
            </CurrencySelect>
            {!hideInput && (
              <>
                <NumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={(val) => {
                    onUserInput(val);
                  }}
                />
              </>
            )}
          </InputRow>
        </Container>
        {!disableCurrencySelect && onCurrencySelect && (
          <CurrencySearchModal
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
          />
        )}
      </InputPanel>
      {account && (
        <StyleBalance>
          {!hideBalance && !!currency && selectedCurrencyBalance
            ? <>
                {(customBalanceText ?? 'Balance: ') + selectedCurrencyBalance?.toSignificant(6)}
                <StyledMax onClick={onMax}>
                  Max
                </StyledMax>
              </>
            : ''}
        </StyleBalance>
      )}
    </>
  );
}
