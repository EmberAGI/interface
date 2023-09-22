import './polyfill';
import { Web3ReactProvider } from '@web3-react/core';
import 'inter-ui';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import App from './legacy/pages/App';
import store from './legacy/state';
import ApplicationUpdater from './legacy/state/application/updater';
import ListsUpdater from './legacy/state/lists/updater';
import MulticallUpdater from './legacy/state/multicall/updater';
import TransactionUpdater from './legacy/state/transactions/updater';
import UserUpdater from './legacy/state/user/updater';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './legacy/theme';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

import {
  metamaskConnector,
  metamaskHooks,
  walletconnectConnector,
  walletconnectHooks,
} from 'airdao-components-and-tools/utils';

const connectors = [
  [metamaskConnector, metamaskHooks],
  [walletconnectConnector, walletconnectHooks],
];


function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  );
}


ReactDOM.render(
  <StrictMode>
    <FixedGlobalStyle />
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore */}
    <Web3ReactProvider connectors={connectors}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root')
);
