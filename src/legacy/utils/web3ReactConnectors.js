import { InjectedConnector } from '@web3-react/injected-connector';
import config from '../../config';

export const ConfiguredInjectedConnector = new InjectedConnector({
  supportedChainIds: [+config.chainId],
});
