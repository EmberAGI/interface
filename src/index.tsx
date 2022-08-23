import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import 'inter-ui';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { NetworkContextName } from './legacy/constants';
import './i18n';
import App from './legacy/pages/App';
import store from './legacy/state';
import ApplicationUpdater from './legacy/state/application/updater';
import ListsUpdater from './legacy/state/lists/updater';
import MulticallUpdater from './legacy/state/multicall/updater';
import TransactionUpdater from './legacy/state/transactions/updater';
import UserUpdater from './legacy/state/user/updater';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './legacy/theme';
import getLibrary from './legacy/utils/getLibrary';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

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
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <HashRouter basename={process.env.PUBLIC_URL}>
              <App />
            </HashRouter>
          </ThemeProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root')
);
