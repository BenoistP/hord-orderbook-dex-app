import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contractReducer from './reducers/contractsReducer';
import uiReducer from './reducers/uiReducer';
import balanceReducer from './reducers/balancesReducer';
import walletReducer from './reducers/walletReducer';
import orderbookReducer from './reducers/orderbookReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default () => {
  const store = createStore(
    combineReducers({
      contracts: contractReducer,
      balances: balanceReducer,
      ui: uiReducer,
      wallet: walletReducer,
      orderbook: orderbookReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
};
