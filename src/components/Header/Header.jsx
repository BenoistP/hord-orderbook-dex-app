import React from 'react';
import { connect } from 'react-redux';
import { WalletConnector } from '@dcentralab/web3-wallet-connector';
import './Header.scss';

import {
  onWalletConnectSuccessAction,
  onWalletDisconnectAction,
  onWalletConnectRequestAction,
  onWalletConnectErrorAction,
} from '../../store/actions/walletActions';
import config from '../../config/config.json';

const Header = ({
  onWalletConnectSuccess,
  onWalletDisconnect,
  onWalletConnectRequest,
  onWalletConnectError,
}) => {
  return (
    <div className="header-wrapper">
            <div className="connect-wallet-container">
                <WalletConnector
                  networkId={config.network}
                  rpcUrl={config.rpcUrl}
                  onClick={() => null}
                  onConnectRequest={onWalletConnectRequest}
                  onConnect={onWalletConnectSuccess}
                  onConnectError={onWalletConnectError}
                  onDisconnect={onWalletDisconnect}
                />
            </div>
    </div>
  );
};

Header.defaultProps = {
  championData: null,
};

const mapStateToProps = () => ({
 
});

const mapDispatchToProps = {
  onWalletConnectSuccess: onWalletConnectSuccessAction,
  onWalletDisconnect: onWalletDisconnectAction,
  onWalletConnectRequest: onWalletConnectRequestAction,
  onWalletConnectError: onWalletConnectErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
