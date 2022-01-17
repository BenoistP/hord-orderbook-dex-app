import React, { useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WalletConnector } from '@dcentralab/web3-wallet-connector';
import clsx from 'clsx';
import { openSignUpModal } from 'redux/actions/modalActions';
import ConnectChampion from './ConnectChampion/ConnectChampion';
import HordButtons from './HordButtons/HordButtons';
import LogoIcon from '../Common/Icons/LogoIcon';
import './Header.scss';
import { createNotification } from '../../redux/actions/uiActions';
import {
  onWalletConnectSuccessAction,
  onWalletDisconnectAction,
  onWalletConnectRequestAction,
  onWalletConnectErrorAction,
} from '../../redux/actions/walletActions';
import CreatePoolButton from './CreatePoolButton/CreatePoolButton';
import config from '../../../../../../config/config.json';
import { CustomLink } from '../Common';

const Header = ({
  onWalletConnectSuccess,
  onWalletDisconnect,
  onWalletConnectRequest,
  onWalletConnectError,
}) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const { pathname } = useLocation();

  const changeChecked = () => {
    setChecked(!checked);
  };
  const closeMenu = () => {
    if (checked) setChecked(false);
  };

  useEffect(() => {
    // close the menu in case of pathname chnage
    setChecked(false);
  }, [pathname]);

  const emptyCallback = useCallback(() => {}, []);


  return (
    <div className="header-wrapper">
      <div className="width-container">
        <div className={clsx('content-wrapper', { checked })}>
          <div className={clsx('flex-wrapper', { checked })}>
            <input className="menu-btn" onChange={emptyCallback} type="checkbox" id="menu-btn" checked={checked} />
            <label className="menu-icon" htmlFor="menu-btn" onClick={changeChecked}>
              <span className="navicon" />
            </label>

            <div className="logo-wrapper">
              <Link to="/" className="home-link">
                <LogoIcon />
              </Link>
              <div className="logo-box">CHAMPIONS</div>
            </div>

            <div className="connect-wallet-container">
              <div className="links-button-wrapper">
                <CreatePoolButton>
                  <CustomLink to="/create-hpool/choose-tokens" text="pools.create_hpool" />
                </CreatePoolButton>
                <HordButtons />
                <WalletConnector
                  networkId={config.network}
                  rpcUrl={config.rpcUrl}
                  onClick={closeMenu}
                  onConnectRequest={onWalletConnectRequest}
                  onConnect={onWalletConnectSuccess}
                  onConnectError={onWalletConnectError}
                  onDisconnect={onWalletDisconnect}
                />
              </div>
            </div>
            <ConnectChampion closeMenu={closeMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  championData: null,
};

Header.propTypes = {
  championData: PropTypes.object,
  openSignUpModal: PropTypes.func.isRequired,
  isChampionVerified: PropTypes.bool.isRequired,
  onWalletConnectSuccess: PropTypes.func.isRequired,
  onWalletDisconnect: PropTypes.func.isRequired,
  onWalletConnectRequest: PropTypes.func.isRequired,
  onWalletConnectError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ champion }) => ({
  championData: champion.championData,
  isChampionVerified: champion.championData?.is_verified_champion === 'VERIFIED',
});

const mapDispatchToProps = {
  openSignUpModal,
  createNotification,
  onWalletConnectSuccess: onWalletConnectSuccessAction,
  onWalletDisconnect: onWalletDisconnectAction,
  onWalletConnectRequest: onWalletConnectRequestAction,
  onWalletConnectError: onWalletConnectErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
