import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBuyOrders, setSellOrders } from 'store/actions/orderbookActions';
import './App.css';

import Dashboard from './views/dashboard/components';

// import { useContractReader } from 'utils/contractReader';
// import { loadContracts } from 'utils/loadContracts';

import { Header, Notifications } from './components';
import { connectToContracts } from './store/actions/contractActions';

const App = ({ connectToContracts, account, MatchingMarket, setBuyOrders, setSellOrders }) => {
  useEffect(() => {
    if (account) connectToContracts();

    setTimeout(() => console.log(MatchingMarket), 5000);
  }, [account]);

  const interactWithContracts = async () => {
    setBuyOrders();
    setSellOrders();
  };
  return (
    // <div className="App">
    //   <Header />
    //   <header className="App-header">
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <button onClick={interactWithContracts}>test</button>
    //     <Notifications position="top-right" autoDelete autoDeleteTime={2000} />
    //   </header>
    // </div>
    <Dashboard/>
  );
};
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
})(App);
