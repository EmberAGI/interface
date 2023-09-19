import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu } from 'airdao-components-and-tools/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useAutoLogin } from 'airdao-components-and-tools/hooks';
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
import YieldFarmView from 'features/YieldFarm/screens/YieldFarmView';
import YieldFarmStakeView from 'features/YieldFarm/screens/YieldFarmStakeView';
import YieldFarmWithdrawView from 'features/YieldFarm/screens/YieldFarmWithdrawView';
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly } from './Swap/redirects';
import { useWeb3React } from '@web3-react/core';
import APRBanner from '../../features/APRBanner/banner';
import logo from '../assets/svg/menu/firepot-airdao-logo.png';
//import logoSm from '../assets/svg/menu/firepot-airdao-logo-sm.png';
import './side-menu-overrides.css';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  overflow-x: hidden;
  margin: 0px auto;
  width: 100%;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
  @media(max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
`;

const Logo = styled.img`
  height: 38px;
`;

export default function App() {
  const web3ReactInstance = useWeb3React();
  const isLoaded = useAutoLogin(web3ReactInstance);

  return !isLoaded ? null : (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <Menu initHidden web3ReactInstance={web3ReactInstance} customLogo={<Logo src={logo} alt="Firepot Finance" />} />
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
                <Route exact strict path="/farm" component={YieldFarmView} />
                {/*<Route exact strict path="/faucet" component={Faucet} />*/}
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact path="/create" component={AddLiquidity} />
                <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route exact strict path="/stake/:stakingTokenAddress" component={YieldFarmStakeView} />
                <Route exact strict path="/withdraw/:stakingTokenAddress" component={YieldFarmWithdrawView} />
                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
          </BodyWrapper>
        </MainWrapper>
      </AppWrapper>
    </Suspense>
  );
}
