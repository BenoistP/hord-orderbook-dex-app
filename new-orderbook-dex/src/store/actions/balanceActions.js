import * as balanceActionTypes from '../actionTypes/balanceActionTypes';

export const setBalances = (balances) => ({
  type: balanceActionTypes.GET_BALANCES,
  payload: balances,
});

export const unsetBalances = () => ({
  type: balanceActionTypes.REMOVE_BALANCES,
});
