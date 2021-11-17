import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBuyOrders } from 'store/actions/orderbookActions';
import './App.css';

// import { useContractReader } from 'utils/contractReader';
// import { loadContracts } from 'utils/loadContracts';

import { Header, Notifications } from './components';
import { connectToContracts } from './store/actions/contractActions';

const App = ({ connectToContracts, account, MatchingMarket, setBuyOrders }) => {
  useEffect(() => {
    if (account) connectToContracts();

    setTimeout(() => console.log(MatchingMarket), 5000);
  }, [account]);

  const interactWithContracts = async () => {
    setBuyOrders();
  };
  return (
    <div className='App'>
      <Header />
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={interactWithContracts}>test</button>
        <Notifications position='top-right' autoDelete autoDeleteTime={2000} />
      </header>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.wallet.account,
    MatchingMarket: state.contracts.MatchingMarket,
    UniswapSimplePriceOracle: state.contracts.UniswapSimplePriceOracle,
  };
};

export default connect(mapStateToProps, { connectToContracts, setBuyOrders })(
  App,
);
