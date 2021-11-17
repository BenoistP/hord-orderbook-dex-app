import * as balanceActionTypes from '../actionTypes/balanceActionTypes';

const initialState = {
  bnbBalance: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case balanceActionTypes.GET_BALANCES:
      return {
        ...state,
        ...action.payload,
      };
    case balanceActionTypes.REMOVE_BALANCES:
      return {
        ethBalance: 0,
      };
    default:
      return state;
  }
};
