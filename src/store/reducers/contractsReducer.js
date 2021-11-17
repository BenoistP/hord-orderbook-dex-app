import * as contractActionTypes from '../actionTypes/contractActionTypes';

const initialState = {
  BUSD: false,
  HPoolToken: false, 
  MatchingMarket: false,
  UniswapSimplePriceOracle: false,
  MakerOtcSupportMethods: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case contractActionTypes.SET_CONTRACTS:
      return {
        ...state,
        ...payload,
      };
    case contractActionTypes.REMOVE_CONTRACTS:
      return {
       BUSD: false,
       HPoolToken: false, 
       MatchingMarket: false,
       UniswapSimplePriceOracle: false,
       MakerOtcSupportMethods: false,
      };
    default:
      return state;
  }
};
