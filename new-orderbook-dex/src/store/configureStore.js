import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contractReducer from './reducers/contractsReducer';
import uiReducer from './reducers/uiReducer';
import balanceReducer from './reducers/balancesReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default () => {
  const store = createStore(
    combineReducers({
      contracts: contractReducer,
      balances: balanceReducer,
      ui: uiReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
};
