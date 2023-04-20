import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { PortisConnector } from '@web3-react/portis-connector';
// import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';
import config from 'config';

// const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
// const PORTIS_ID = process.env.REACT_APP_PORTIS_ID

if (typeof config.networkUrl === 'undefined') {
  throw new Error(`network url must be a defined environment variable`);
}

export const network = new NetworkConnector({
  urls: { [config.chainId]: config.networkUrl },
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any));
}

export const injected = new InjectedConnector({
  supportedChainIds: [config.chainId],
});

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [config.chainId]: config.networkUrl },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
// export const fortmatic = new FortmaticConnector({
//   apiKey: FORMATIC_KEY ?? '',
//   chainId: 1
// })

// mainnet only
// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1]
// })

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: config.networkUrl,
  appName: 'FirepotSwap',
  // appLogoUrl: '',
});
