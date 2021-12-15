import * as balanceActionTypes from '../actionTypes/balanceActionTypes';

const initialState = {
  busdBalance: 0,
  currentHPoolTokenBalance: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case balanceActionTypes.SET_BALANCE:
      return {
        ...state,
        [payload.tokenName]: payload.balance,
      };
    case balanceActionTypes.REMOVE_BALANCES:
      return {
        ethBalance: 0,
      };
    default:
      return state;
  }
};
