import * as balanceActionTypes from '../actionTypes/balanceActionTypes';

const initialState = {
  bnbBalance: 0,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case balanceActionTypes.GET_BALANCES:
      return {
        ...state,
        ...payload,
      };
    case balanceActionTypes.REMOVE_BALANCES:
      return {
        ethBalance: 0,
      };
    default:
      return state;
  }
};
