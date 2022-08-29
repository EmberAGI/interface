import { InjectedConnector } from '@web3-react/injected-connector';

export const ConfiguredInjectedConnector = new InjectedConnector({
  supportedChainIds: [process.env.REACT_APP_CHAIN_ID],
});
