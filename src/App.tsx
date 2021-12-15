import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setBuyOrders, setSellOrders } from 'store/actions/orderbookActions';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import Dashboard from './views/dashboard/components';
import * as S from './views/landing/styles';
import { connectToContracts } from './store/actions/contractActions';
import { WalletConnector } from '@dcentralab/web3-wallet-connector';
import config from './config/config.json';
import {
  onWalletConnectSuccessAction,
  onWalletDisconnectAction,
  onWalletConnectRequestAction,
  onWalletConnectErrorAction,
} from './store/actions/walletActions';

function App({
  connectToContracts,
  account,
  MatchingMarket,
  setBuyOrders,
  setSellOrders,
  onWalletConnectSuccess,
  onWalletDisconnect,
  onWalletConnectRequest,
  onWalletConnectError,
}) {
  const [checked, setChecked] = useState(false);

  const closeMenu = () => {
    if (checked) setChecked(false);
  };
  useEffect(() => {
    if (account) connectToContracts();

    setTimeout(() => console.log(MatchingMarket), 5000);
  }, [account]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.Page>
        <WalletConnector
          networkId={config.network}
          rpcUrl={config.rpcUrl}
          onClick={closeMenu}
          onConnectRequest={onWalletConnectRequest}
          onConnect={onWalletConnectSuccess}
          onConnectError={onWalletConnectError}
          onDisconnect={onWalletDisconnect}
        />
        <Dashboard blockchainApi={'BSC'} />
      </S.Page>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.wallet.account,
    MatchingMarket: state.contracts.MatchingMarket,
    UniswapSimplePriceOracle: state.contracts.UniswapSimplePriceOracle,
  };
};

export default connect(mapStateToProps, {
  connectToContracts,
  setBuyOrders,
  setSellOrders,
  onWalletConnectSuccess: onWalletConnectSuccessAction,
  onWalletDisconnect: onWalletDisconnectAction,
  onWalletConnectRequest: onWalletConnectRequestAction,
  onWalletConnectError: onWalletConnectErrorAction,
})(App);
