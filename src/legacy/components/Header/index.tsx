import { ChainId } from '@firepotfinance/firepotfinance-sdk';
import React from 'react';
import { Text } from 'rebass';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TVLView from '../../../features/TVLDisplay/components/TVLView';
import { useActiveWeb3React } from '../../hooks';
// import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances } from '../../state/wallet/hooks';
import { LightCard } from '../Card';
import Row from '../Row';
import Web3Status from '../Web3Status';

const HeaderFrame = styled.div`
  width: 100%;
  margin: 0.8rem auto;
  padding: 0.8rem 1.6rem;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: auto auto;
  `};

  @media screen and (max-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: auto;
  `};
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`;

const HeaderLinks = styled(Row)`
  grid-column-start: 2;
  width: auto;
  margin: 0 auto;
  padding: 0.3rem;
  justify-content: center;
  border-radius: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;
  background-color: ${({ theme }) => theme.bg1};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-column-start: 1;
  `};

  @media screen and (max-width: 1050px) {
    grid-column-start: 2;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    position: fixed;
    bottom: 0;
    padding: .5rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.bg3};
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border-radius: 0.8rem;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`;

const HideSmall = styled.span``;

const NetworkCard = styled(LightCard)`
  border-radius: 0.8rem;
  padding: 8px 12px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const activeClassName = 'ACTIVE';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 0.9rem;
  width: fit-content;
  padding: 0.3rem 0.6rem;
  font-weight: 500;
  transition: 0.3s;

  &:not(:last-child) {
    margin-right: 0.16rem;
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg3};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    border-radius: 8px;
    padding: 0.3rem 7%;
    border: 1px solid ${({ theme }) => theme.bg3};

    &:not(:last-child) {
      margin-right: 2%;
    }
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.8rem;
    padding: 0.3rem 5%;
  `};
`;

const StyledLink = styled.a`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 0.9rem;
  width: fit-content;
  padding: 0.3rem 0.6rem;
  font-weight: 500;
  transition: 0.3s;

  &:not(:last-child) {
    margin-right: 0.16rem;
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg3};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    border-radius: 8px;
    padding: 0.3rem 7%;
    border: 1px solid ${({ theme }) => theme.bg3};

    &:not(:last-child) {
      margin-right: 2%;
    }
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.8rem;
    padding: 0.3rem 5%;
  `};
`;

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px,
    rgba(0, 0, 0, 0.01) 0px 24px 32px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Goerli',
  [ChainId.AMBTEST]: 'Ambtest',
};

export default function Header() {
  const { account, chainId } = useActiveWeb3React();
  const { t } = useTranslation();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];
  // const [darkMode, toggleDarkMode] = useDarkModeManager();

  return (
    <HeaderFrame>
      {/* <HeaderRow>
        <Title href=".">
          <Icon>
            {/* <img width={'22px'} src={darkMode ? LogoDark : Logo} alt="logo" />
            <img width={'22px'} src={LogoFP} alt="logo" />
          </Icon>
        </Title>
      </HeaderRow> */}

      <HeaderLinks>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          {t('swap')}
        </StyledNavLink>
        <StyledNavLink
          id={`pool-nav-link`}
          to={'/pool'}
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/add') ||
            pathname.startsWith('/remove') ||
            pathname.startsWith('/create') ||
            pathname.startsWith('/find')
          }
        >
          {t('pool')}
        </StyledNavLink>
        <StyledNavLink
          id={`farm-nav-link`}
          to={'/farm'}
          isActive={(match, { pathname }) =>
            Boolean(match) || pathname.startsWith('/stake') || pathname.startsWith('/withdraw')
          }
        >
          {t('Farm')}
        </StyledNavLink>
        {chainId !== ChainId.MAINNET && (
          <StyledLink id={`faucet-nav-link`} href={'https://faucet.ambrosus-test.io/'} target="_blank">
            🚰 {t('Faucet')}
          </StyledLink>
        )}
      </HeaderLinks>

      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          <TVLView />
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(8)} AMB
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        {/*<HeaderElementWrap>
          <StyledMenuButton onClick={toggleDarkMode}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
        </HeaderElementWrap>*/}
      </HeaderControls>
    </HeaderFrame>
  );
}
