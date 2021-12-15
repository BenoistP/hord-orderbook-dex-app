import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contractReducer from './reducers/contractsReducer';
import uiReducer from './reducers/uiReducer';
import balanceReducer from './reducers/balancesReducer';
import walletReducer from './reducers/walletReducer';
import orderbookReducer from './reducers/orderbookReducer';
import inputReducer from './reducers/inputReducer';
import tradingPairReducer from './reducers/tradingPairReducer';
import transactionReducer from './reducers/transactionReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default () => {
  const store = createStore(
    combineReducers({
      contracts: contractReducer,
      balances: balanceReducer,
      ui: uiReducer,
      wallet: walletReducer,
      orderbook: orderbookReducer,
      input: inputReducer,
      tradingPair: tradingPairReducer,
      transactions: transactionReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
};
