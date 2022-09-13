import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Menu from 'airdao-menu/build';
import Header from '../components/Header';
import Polling from '../components/Header/Polling';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import AddLiquidity from './AddLiquidity';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './AddLiquidity/redirects';
import Pool from './Pool';
import PoolFinder from './PoolFinder';
import RemoveLiquidity from './RemoveLiquidity';
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects';
import Swap from './Swap';
import Faucet from './Faucet';
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly } from './Swap/redirects';
import useAutoLogin from '../hooks/useAutoLogin';
import { useWeb3React } from '@web3-react/core';
import useAuthorization from '../hooks/useAuthorization';
import logo from '../assets/svg/menu/firepot-airdao-logo.png';
//import logoSm from '../assets/svg/menu/firepot-airdao-logo-sm.png';
import './side-menu-overrides.css';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  overflow-x: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  flex-flow: column;
  `};
`;

const MenuWrapper = styled.div`
  display: flex;
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  width: 100%;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

const Logo = styled.img`
  height: 38px;
`;

export default function App() {
  const isLoaded = useAutoLogin();
  const { account: address } = useWeb3React();
  const { loginMetamask, logout } = useAuthorization();

  return !isLoaded ? null : (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <MenuWrapper>
          <Menu
            address={address}
            login={loginMetamask}
            logout={logout}
            customLogo={<Logo src={logo} alt="Firepot Finance" />}
          />
        </MenuWrapper>

        <MainWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>

          <BodyWrapper>
            <Popups />
            <Polling />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/faucet" component={Faucet} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact path="/create" component={AddLiquidity} />
                <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
          </BodyWrapper>
        </MainWrapper>
      </AppWrapper>
    </Suspense>
  );
}
