import React, { useEffect, useState } from 'react';
import logo from '../../assets/svg/menu/firepot-airdao-logo.png';
import logoSm from '../../assets/svg/menu/firepot-airdao-logo-sm.png';
import { ReactComponent as Twitter } from '../../assets/svg/menu/twitter.svg';
import { ReactComponent as Telegram } from '../../assets/svg/menu/telegram.svg';
import { ReactComponent as Reddit } from '../../assets/svg/menu/reddit.svg';
import { ReactComponent as Circles } from '../../assets/svg/menu/circles.svg';
import menu from '../../assets/svg/menu/menu.svg';
import close from '../../assets/svg/menu/close.svg';
import { ReactComponent as Metamask } from '../../assets/svg/menu/metamask.svg';
import { ReactComponent as Copy } from '../../assets/svg/menu/copy.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svg/menu/logout.svg';
import { ReactComponent as House } from '../../assets/svg/menu/house.svg';
import { ReactComponent as Docs } from '../../assets/svg/menu/docs.svg';
import { ReactComponent as Message } from '../../assets/svg/menu/message-plus.svg';
import { ReactComponent as Book } from '../../assets/svg/menu/book.svg';
import useAuthorization from '../../hooks/useAuthorization';
import { useWeb3React } from '@web3-react/core';
import './index.scss';

// eslint-disable-next-line react/prop-types
const AddressBlock = ({ address = '' }) => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(address);
    }
    return null;
  };
  const { logout } = useAuthorization();

  return (
    <div className="address-block">
      <div className="address-block__metamask-icon">
        <Metamask />
      </div>
      <span>{`${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`}</span>
      <button onClick={logout} type="button" style={{ marginLeft: 'auto' }}>
        <LogoutIcon />
      </button>
      <button onClick={copyToClipboard} type="button" className="address-block__copy">
        <Copy />
      </button>
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 720);
  const { loginMetamask } = useAuthorization();
  const { account: address } = useWeb3React();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 720);
    };
    window.addEventListener('resize', handleResize, true);
  }, []);

  const handleOpen = () => setIsOpen((state) => !state);

  return (
    <div className={`side-menu${isOpen ? ' side-menu_expanded' : ''}`}>
      <div className="side-menu__mobile-wrapper">
        {isOpen ? (
          <img className="side-menu__logo" src={logo} alt="logo" />
        ) : (
          <img className="side-menu__logo" src={logoSm} alt="logo" />
        )}
        <button type="button" onClick={handleOpen} className="side-menu__hamburger">
          <img src={isOpen ? close : menu} alt="menu" />
        </button>
      </div>
      {isOpen && (
        <>
          <div className="side-menu__content">
            {address ? (
              <AddressBlock address={address} />
            ) : (
              <button type="button" className="side-menu__connect-wallet" onClick={loginMetamask}>
                Connect wallet
              </button>
            )}
            <ul className="side-menu__list">
              <li>
                <a href="/firepot/swap" style={{ color: '#457EFF' }}>
                  FirepotSwap
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="/staking">
                  Staking
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="/bridge">
                  Bridge
                </a>
              </li>
              <li>
                <a className="side-menu__list-link" href="https://explorer-beta.ambrosus.io/">
                  Network Explorer
                </a>
              </li>
              <li className="side-menu__list-vote">
                <span>DAO Tools</span>
                <span>Coming Soon</span>
              </li>
            </ul>
            <ul className="side-menu__list side-menu__list_small">
              <li>
                <House />
                <a href="/">AIRDAO Main</a>
              </li>
              <li>
                <Docs />
                <a href="/">Docs</a>
              </li>
              <li>
                <Message />
                <a href="mailto:support@airdao.io ">Feedback</a>
              </li>
              <li>
                <Book />
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
