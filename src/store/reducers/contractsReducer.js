import * as contractActionTypes from '../actionTypes/contractActionTypes';

const initialState = {
  currentHPoolTokenContract: false,
  BUSD: false,
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
        currentHPoolTokenContract: false,
        MatchingMarket: false,
        UniswapSimplePriceOracle: false,
        MakerOtcSupportMethods: false,
      };
    case contractActionTypes.SET_CURRENT_HPOOL_TOKEN_CONTRACT:
      return {
        ...state,
        currentHPoolTokenContract: payload,
      };
    default:
      return state;
  }
};
