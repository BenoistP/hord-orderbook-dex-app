import * as types from '../actionTypes/balanceActionTypes';

const initialState = {
  bnbBalance: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BALANCES:
      return {
        ...state,
        ...action.payload,
      };
    case types.REMOVE_BALANCES:
      return {
        ethBalance: 0,
      };
    default:
      return state;
  }
};
