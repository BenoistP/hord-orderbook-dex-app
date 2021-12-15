import * as tradingPairActionTypes from '../actionTypes/tradingPairActionTypes';

const initialState = {
    currentHPoolToken: null,
    hPoolTokensList: null 
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case tradingPairActionTypes.SET_HPOOL_TOKENS_LIST:
      return {
        ...state,
        hPoolTokensList: payload,
      };
    case tradingPairActionTypes.SET_CURRENT_HPOOL_TOKEN:
      return {
        ...state,
        currentHPoolToken: payload,
      };
    default:
      return state;
  }
};
