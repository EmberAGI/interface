import React, { useEffect, useState } from 'react';
import logo from '../../assets/svg/menu/firepot-airdao-logo.png';
import logoSm from '../../assets/svg/menu/firepot-airdao-logo-sm.png';
import { ReactComponent as Twitter } from '../../assets/svg/menu/twitter.svg';
import { ReactComponent as Telegram } from '../../assets/svg/menu/telegram.svg';
import { ReactComponent as Reddit } from '../../assets/svg/menu/reddit.svg';
import { ReactComponent as Circles } from '../../assets/svg/menu/circles.svg';
import link from '../../assets/svg/menu/link.svg';
import menu from '../../assets/svg/menu/menu.svg';
import close from '../../assets/svg/menu/close.svg';
import house from '../../assets/svg/menu/house.svg';
import docs from '../../assets/svg/menu/docs.svg';
import message from '../../assets/svg/menu/message-plus.svg';
import book from '../../assets/svg/menu/book.svg';
import { useActiveWeb3React } from '../../hooks';
import Web3Status from '../Web3Status';
import './index.scss';

/*const ambMainNetChainId = 16718;

const changeChainId = async () => {
  const chainId = utils.hexValue(ambMainNetChainId);

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (switchError) {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName: 'Ambrosus',
          nativeCurrency: {
            name: 'Amber',
            symbol: 'AMB',
            decimals: 18,
          },
          rpcUrls: ['https://network.ambrosus.io/'],
          blockExplorerUrls: ['https://explorer.ambrosus.io/'],
        },
      ],
    });
  }
};*/

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ account, setAddress, isMobile }) => {
  /*const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
  };

  const logoutUser = () => setAddress('');*/

  return (
    <div className="address-block-wrapper">
      {account && !isMobile && <span className="side-menu__address-block-title">Connected wallet</span>}
      <div className="address-block">
        <Web3Status />
        {/*<img className="address-block__metamask-icon" src={metamask} alt="metamask" />
        <span>{`${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`}</span>
        <button onClick={copyToClipboard} type="button" className="address-block__copy">
          <img src={copy} alt="copy" />
        </button>
        <button onClick={logoutUser} type="button">
          <img src={logout} alt="log out" />
        </button>*/}
      </div>
    </div>
  );
};

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 720);
  const [address, setAddress] = useState('');
  const { account } = useActiveWeb3React();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
      setIsOpen(window.innerWidth > 720);
    };
    window.addEventListener('resize', handleResize, true);

    /*if (window.ethereum) {
      window.ethereum.on('networkChanged', (networkId) => {
        if (networkId !== ambMainNetChainId.toString()) {
          setAddress('');
        }
      });
    }*/
  }, []);

  /*const handleMetamask = async () => {
    const getAddress = () => {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => setAddress(accounts[0]));
    };

    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.networkVersion === ambMainNetChainId.toString()) {
        getAddress();
      } else {
        await changeChainId();
        getAddress();
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };*/

  const handleOpen = () => setIsOpen((state) => !state);

  return (
    <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
      <div className="side-menu__mobile-wrapper">
        <img className="side-menu__logo" src={logo} alt="logo" />
        <button onClick={handleOpen} className="side-menu__hamburger">
          <img src={isOpen ? close : menu} alt="menu" />
        </button>
      </div>
      {isOpen && (
        <>
          <div className="side-menu__content">
            {address ? (
              <AddressBlock address={address} setAddress={setAddress} />
            ) : (
              <button
                type="button"
                className='side-menu__connect-wallet'
              >
                Connect wallet
              </button>
            )}
            <ul className="side-menu__list">
              <li>
                <a href="https://airdao.io/firepot/swap">Firepot Swap</a>
              </li>
              <li>
                <a href="https://airdao.io/firepot/pool">Firepot Pool</a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://airdao.io/staking/">
                  Stake
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://airdao.io/bridge/">
                  Bridge
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://explorer-beta.ambrosus.io/">
                  AMB Network Explorer
                </a>
              </li>
              <li className="side-menu__list-vote">
                <span>DAO Tools</span>
                <span>Coming Soon</span>
              </li>
            </ul>
            <ul className="side-menu__list side-menu__list_small">
              <li>
                <img src={house} alt="main"/>
                <a href="/">AIRDAO Main</a>
              </li>
              <li>
                <img src={docs} alt="docs"/>
                <a href="/">Docs</a>
              </li>
              <li>
                <img src={message} alt="message"/>
                <a href="/">Feedback</a>
              </li>
              <li>
                <img src={book} alt="book"/>
                <a href="/">Brand materials</a>
              </li>
            </ul>
            <ul className="side-menu__list side-menu__list_socials">
              <li>
                <a href="/">
                  <Twitter />
                </a>
              </li>
              <li>
                <a href="/">
                  <Telegram />
                </a>
              </li>
              <li>
                <a href="/">
                  <Reddit />
                </a>
              </li>
              <li>
                <a href="/">
                  <Circles />
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
