import AirdaoLogo from '../assets/images/AirdaoLogo.png';
import BusdLogo from '../assets/images/BusdLogo.png';
import UsdcLogo from '../assets/images/UsdcLogo.png';
// import UsdtLogo from '../../../assets/images/UsdtLogo.png';

const FIREPOT_LOGO_URL =
  'https://static.wixstatic.com/media/b908d5_3a7875d36a014d73b963fa1b94f66eab~mv2.png/v1/fill/w_238,h_144,al_c,lg_1,q_85,enc_auto/logo%20color%20correcto.png';

const envChainId: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '0');

type Config = {
  appLogoUrl: string;
  networkUrl: string;
  chainId: number;
  registrarAddress: string;
  multicallAddress: string;
  factoryAddress: string;
  routerAddress: string;
  factoryInitHash: string;
  tokens: Record<any, any>;
  pools: string[];
  yieldFarms: Record<any, any>;
};

const config = {
  develop: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus-test.io',
    chainId: envChainId === 0 ? 22040 : envChainId,
    registrarAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    multicallAddress: '0xc18b9a12d9C06b7a44CCF884ECD57EB0D3754f09',
    factoryAddress: '0x603Db5Bf865DBBB4778c353930e795823e095b36',
    routerAddress: '0x9f45d83b76178F1fE9Ed01bD978e3567349DC1ff',
    factoryInitHash: '0x72008ad25147c6e527f4e6cf099cc5a53ebe59d221f5725be518a452f4ad2fb3',
    tokens: {
      usdc: {
        name: 'USD Coin',
        symbol: 'USDC',
        address: '0x952b98DBDa3319BF0e339cC9CC574fF768F80f3c',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
        chainId: envChainId === 0 ? 22040 : envChainId,
      },
      usdt: {
        name: 'Tether USD',
        symbol: 'USDT',
        address: '0x1bB13b68DbA3571415B4092802777B5cA15de897',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
        chainId: envChainId === 0 ? 22040 : envChainId,
      },
    },
    pools: ['0x66c7C9F11AC12687c11D0274D2074582DE3675E7', '0xc932B85811cf4C424e1aE98e52267517d01d49E1'],
    yieldFarms: {
      usdc_amb: {
        farmContractAddress: '',
        stakeToken: 'AMB-USDC-flp',
        rewardToken: 'AMB-USDC-flp',
        lpAddress: '0x2cdd0140b9e3463D3E81E243c14F8111D0b79c75',
        tokenImg1: AirdaoLogo,
        tokenImg2: UsdcLogo,
      },
      busd_amb: {
        farmContractAddress: '',
        stakeToken: 'AMB-BUSD-flp',
        rewardToken: 'AMB-BUSD-flp',
        lpAddress: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        tokenImg1: AirdaoLogo,
        tokenImg2: BusdLogo,
      },
      usdt_amb: {},
    },
  },
  qa: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus.io',
    chainId: envChainId === 0 ? 16718 : envChainId,
    registrarAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    multicallAddress: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
    factoryInitHash: '0xa02108a20103c6b7994b253834b7e2d8ee2eae0400220a2074fe8d885ce59fce',
    tokens: {
      usdc: {
        address: '0x290998B7B5589AFdc4E3f3c7eF817F05dcDEC947',
        decimals: 18,
        symbol: 'USDC',
        name: 'USD//C',
        logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
      usdt: {
        name: 'USD//T',
        symbol: 'USDT',
        address: '0xfEE01F2D120250A0a59bfbF9C144F8ECC4425fCc',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
      busd: {
        name: 'Binance USD',
        address: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        symbol: 'BUSD',
        decimals: 18,
        logoURI: 'https://bscscan.com/token/images/busd_32.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
    },
    yieldFarms: {
      usdc_amb: {
        farmContractAddress: '0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585',
        stakeToken: 'AMB-USDC-flp',
        rewardToken: 'AMB-USDC-flp',
        lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
        tokenImg1: AirdaoLogo,
        tokenImg2: UsdcLogo,
      },
      busd_amb: {
        farmContractAddress: '0xa17DdfBCB5D8304835062324D99bfBd1d5cE4841',
        stakeToken: 'AMB-BUSD-flp',
        rewardToken: 'AMB-BUSD-flp',
        lpAddress: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        tokenImg1: AirdaoLogo,
        tokenImg2: BusdLogo,
      },
      usdt_amb: {},
    },
  },
  production: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus.io',
    chainId: envChainId === 0 ? 16718 : envChainId,
    registrarAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    multicallAddress: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
    factoryAddress: '0xe63Cf585Dae8273A5e37AfF6da2f823FBf3Eb5BE',
    routerAddress: '0xAa9ADAffdfFDDd64B9174F7EB451F0F1332245B2',
    factoryInitHash: '0xa02108a20103c6b7994b253834b7e2d8ee2eae0400220a2074fe8d885ce59fce',
    tokens: {
      usdc: {
        name: 'USD Coin',
        symbol: 'USDC',
        address: '0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
      usdt: {
        name: 'Tether USD',
        symbol: 'USDT',
        address: '0xfEE01F2D120250A0a59bfbF9C144F8ECC4425fCc',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
      busd: {
        name: 'Binance USD',
        symbol: 'BUSD',
        address: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        decimals: 18,
        logoURI: 'https://bscscan.com/token/images/busd_32.png',
        chainId: envChainId === 0 ? 16718 : envChainId,
      },
    },
    pools: ['0x015AB9B3771F1748007ea62885737eF4Fa346291', '0xfD3aA0C31308cB069F4c7ebB27A556B264c0C763'],
    yieldFarms: {
      usdc_amb: {
        farmContractAddress: '0x035Cf2b69d439565A812aAf2DfE174c89Ba3e585',
        stakeToken: 'AMB-USDC-flp',
        rewardToken: 'AMB-USDC-flp',
        lpAddress: '0xA9646A0281996fDcB88f8f6f01Af52BB0268c494',
        tokenImg1: AirdaoLogo,
        tokenImg2: UsdcLogo,
      },
      busd_amb: {
        farmContractAddress: '0xa17DdfBCB5D8304835062324D99bfBd1d5cE4841',
        stakeToken: 'AMB-BUSD-flp',
        rewardToken: 'AMB-BUSD-flp',
        lpAddress: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        tokenImg1: AirdaoLogo,
        tokenImg2: BusdLogo,
      },
      usdt_amb: {},
    },
  },
};

type envConfigMap = {
  [key: number]: Config;
};

const envConfig: envConfigMap = {
  0: config.develop,
  16718: config.production,
  22040: config.develop,
};

export default envConfig[envChainId];
