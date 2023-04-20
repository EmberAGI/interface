import AirdaoLogo from '../assets/images/AirdaoLogo.png';
import BusdLogo from '../assets/images/BusdLogo.png';
import UsdcLogo from '../assets/images/UsdcLogo.png';
// import UsdtLogo from '../../../assets/images/UsdtLogo.png';

const FIREPOT_LOGO_URL =
  'https://static.wixstatic.com/media/b908d5_3a7875d36a014d73b963fa1b94f66eab~mv2.png/v1/fill/w_238,h_144,al_c,lg_1,q_85,enc_auto/logo%20color%20correcto.png';

const config = {
  development: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus-test.io',
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? '22040'),
    registrarAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    multicallAddress: '0xc18b9a12d9C06b7a44CCF884ECD57EB0D3754f09',
    tokens: {
      usdc: {
        name: 'USD//C',
        symbol: 'USDC',
        address: '0x952b98DBDa3319BF0e339cC9CC574fF768F80f3c',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
        chainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? '22040'),
      },
      usdt: {
        name: 'USD//T',
        symbol: 'USDT',
        address: '0x1bB13b68DbA3571415B4092802777B5cA15de897',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
        chainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? '22040'),
      },
    },
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
    pools: {},
  },
  qa: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus.io',
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? '16718'),
  },
  production: {
    appLogoUrl: process.env.REACT_APP_LOGO_URL ?? FIREPOT_LOGO_URL,
    networkUrl: process.env.REACT_APP_NETWORK_URL ?? 'https://network.ambrosus.io',
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? '16718'),
    registrarAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    multicallAddress: '0x04319880B30E6082Aaf7368EdfE9A5E6c515d62E',
    tokens: {
      usdc: {
        address: '0x290998B7B5589AFdc4E3f3c7eF817F05dcDEC947',
        decimals: 18,
        symbol: 'USDC',
        name: 'USD//C',
        logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      },
      usdt: {
        name: 'USD//T',
        symbol: 'USDT',
        address: '0xfEE01F2D120250A0a59bfbF9C144F8ECC4425fCc',
        decimals: 18,
        logoURI: 'https://etherscan.io/token/images/tethernew_32.png',
      },
      busd: {
        name: 'Binance USD',
        address: '0x7A477aA8ED4884509387Dba81BA6F2B7C97597e2',
        symbol: 'BUSD',
        decimals: 18,
        logoURI: 'https://bscscan.com/token/images/busd_32.png',
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
};

export default config.production;
