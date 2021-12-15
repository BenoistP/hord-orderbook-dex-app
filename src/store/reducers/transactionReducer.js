import * as transactionActionTypes from '../actionTypes/transactionActionTypes';

const initialState = {
  openOrders: [],
  tradeHistory: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case transactionActionTypes.SET_OPEN_ORDERS:
      return {
        ...state,
        openOrders: [...state.openOrders, ...payload],
      };
    default:
      return state;
  }
};
