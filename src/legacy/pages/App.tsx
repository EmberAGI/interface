import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useAutoLogin, useAuthorization } from 'airdao-components-and-tools/hooks';
import Header from '../components/Header';
import Polling from '../components/Header/Polling';
import Popups from '../components/Popups';
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
import { Footer, Button } from '@airdao/ui-library';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';
import { Header as HeaderMenu } from '@airdao/ui-library';
import { useCurrencyBalance } from '../state/wallet/hooks';
import { AMBER } from '@firepotfinance/firepotfinance-sdk';

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

const FooterWrapper = styled.div`
  margin-top: auto;
  width: 100%;
  
  a {
    text-decoration: none;
  }
  
  footer {
    padding-bottom: 20px;
  }
`;

const HelpWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

export default function App() {
  const { account } = useWeb3React();
  const isLoaded = useAutoLogin(metamaskConnector);

  const { loginMetamask, loginWalletConnect, logout } = useAuthorization(
    metamaskConnector,
    walletconnectConnector
  );

  const balance = useCurrencyBalance(account, AMBER);

  return !isLoaded ? null : (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        {/*<Menu*/}
        {/*  initHidden*/}
        {/*  customLogo={<Logo src={logo} alt="Firepot Finance" />}*/}
        {/*  metamaskConnector={metamaskConnector}*/}
        {/*  walletconnectConnector={walletconnectConnector}*/}
        {/*/>*/}

        <HeaderMenu
          loginMetamask={loginMetamask}
          loginWalletConnect={loginWalletConnect}
          account={account}
          disconnect={logout}
          balance={balance?.toFixed(2)}
        />

        <MainWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Polling />
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/farm" component={YieldFarmView} />
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
          </BodyWrapper>
          <FooterWrapper>
            <HelpWrapper>
              <a href="https://airdao.academy/guides/firepotswap-swap-guide" target="_blank" rel="noreferrer nofollow">
                <Button type="tetiary" size="large" leadIcon={<BookIcon />}>
                  Learn how to Stake
                </Button>
              </a>
              <a href="https://airdao.academy/" target="_blank" rel="noreferrer nofollow">
                <Button type="tetiary" size="large" leadIcon={<InfoIcon />}>
                  Guides
                </Button>
              </a>
              <a href="https://airdao.io/team" target="_blank" rel="noreferrer">
                <Button type="tetiary" size="large" leadIcon={<ChatHelpIcon />}>
                  Support
                </Button>
              </a>
            </HelpWrapper>
            <Footer />
          </FooterWrapper>
        </MainWrapper>
      </AppWrapper>
    </Suspense>
  );
}

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M6.5 2C5.39543 2 4.5 2.89543 4.5 4V16C4.5 17.1046 5.39543 18 6.5 18H16C16.2761 18 16.5 17.7761 16.5 17.5C16.5 17.2239 16.2761 17 16 17H6.5C5.94772 17 5.5 16.5523 5.5 16H15.5C16.0523 16 16.5 15.5523 16.5 15V4C16.5 2.89543 15.6046 2 14.5 2H6.5ZM11.25 5.75C11.25 6.16421 10.9142 6.5 10.5 6.5C10.0858 6.5 9.75 6.16421 9.75 5.75C9.75 5.33579 10.0858 5 10.5 5C10.9142 5 11.25 5.33579 11.25 5.75ZM11 12.5C11 12.7761 10.7761 13 10.5 13C10.2239 13 10 12.7761 10 12.5V8.5C10 8.22386 10.2239 8 10.5 8C10.7761 8 11 8.22386 11 8.5V12.5Z" fill="#393B40"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M18.5 10C18.5 5.58172 14.9183 2 10.5 2C6.08172 2 2.5 5.58172 2.5 10C2.5 14.4183 6.08172 18 10.5 18C14.9183 18 18.5 14.4183 18.5 10ZM10.0081 8.91012C10.0504 8.67687 10.2545 8.49999 10.5 8.49999C10.7455 8.49999 10.9496 8.67687 10.9919 8.91012L11 8.99999V13.5021L10.9919 13.592C10.9496 13.8253 10.7455 14.0021 10.5 14.0021C10.2545 14.0021 10.0504 13.8253 10.0081 13.592L10 13.5021V8.99999L10.0081 8.91012ZM9.75 6.74999C9.75 6.33578 10.0858 5.99999 10.5 5.99999C10.9142 5.99999 11.25 6.33578 11.25 6.74999C11.25 7.16421 10.9142 7.49999 10.5 7.49999C10.0858 7.49999 9.75 7.16421 9.75 6.74999Z" fill="#393B40"/>
  </svg>
);

const ChatHelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.00001 10C2.00001 5.58172 5.58173 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.65078 18 7.37829 17.6656 6.26225 17.0748L2.62128 17.9851C2.45089 18.0277 2.27065 17.9777 2.14646 17.8536C2.02227 17.7294 1.97234 17.5491 2.01494 17.3787L2.92518 13.7378C2.33442 12.6217 2.00001 11.3492 2.00001 10ZM9.25027 7.30723C9.40317 7.13358 9.64031 7 10 7C10.3597 7 10.5968 7.13358 10.7497 7.30723C10.9113 7.49072 11 7.74463 11 8C11 8.31707 10.9286 8.52273 10.8337 8.68547C10.7328 8.85858 10.5985 8.99908 10.4106 9.19559L10.3885 9.21878C10.2003 9.41576 9.96787 9.66319 9.79142 10.0002C9.61017 10.3464 9.5 10.7611 9.5 11.2929C9.5 11.5691 9.72386 11.7929 10 11.7929C10.2761 11.7929 10.5 11.5691 10.5 11.2929C10.5 10.9085 10.5773 10.6551 10.6773 10.4641C10.7821 10.2639 10.9247 10.1051 11.1115 9.90956L11.1528 9.86652C11.3225 9.68963 11.5347 9.46855 11.6976 9.18921C11.8839 8.86964 12 8.48947 12 8C12 7.52689 11.8387 7.0308 11.5003 6.64641C11.1532 6.25219 10.6403 6 10 6C9.35969 6 8.84683 6.25219 8.49973 6.64641C8.16129 7.0308 8 7.52689 8 8C8 8.27614 8.22386 8.5 8.5 8.5C8.77614 8.5 9 8.27614 9 8C9 7.74463 9.08871 7.49072 9.25027 7.30723ZM10.6995 13.5126C10.6995 13.1262 10.3863 12.813 9.99989 12.813C9.61352 12.813 9.30029 13.1262 9.30029 13.5126C9.30029 13.899 9.61352 14.2122 9.99989 14.2122C10.3863 14.2122 10.6995 13.899 10.6995 13.5126Z" fill="#393B40"/>
  </svg>
);
