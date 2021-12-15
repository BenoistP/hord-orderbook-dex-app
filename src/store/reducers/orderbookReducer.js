import * as orderbookActionTypes from '../actionTypes/orderbookActionTypes';

const initialState = {
  tradingPair: 'DAI/HPool',
  buyOrders: [],
  sellOrders: [],
  tradeHistory: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case orderbookActionTypes.SET_BUY_ORDERS:
      return {
        ...state,
        buyOrders: payload,
      };
    case orderbookActionTypes.SET_SELL_ORDERS:
      return {
        ...state,
        sellOrders: payload,
      };
    case orderbookActionTypes.SET_TRADE_HISTORY:
      return {
        ...state,
        tradeHistory: payload,
      };
    case orderbookActionTypes.SET_TRADING_PAIR:
      return {
        ...state,
        tradingPair: payload,
      };
    default:
      return state;
  }
};
