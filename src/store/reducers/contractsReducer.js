import * as contractActionTypes from '../actionTypes/contractActionTypes';

const initialState = {
  signerAddress: 'Not connected',
  MatchingMarket: false,
  UniswapSimplePriceOracle: false,
  provider: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case contractActionTypes.GET_CONTRACT:
      return {
        ...state,
        signerAddress: payload.signerAddress,
        provider: payload.provider,
        ...payload.newContracts,
      };
    case contractActionTypes.REMOVE_CONTRACT:
      return {
       signerAddress: 'Not connected',
       MatchingMarket: false,
       UniswapSimplePriceOracle: false,
       provider: false,
      };
    case contractActionTypes.ADD_SIGNERADDRESS:
      return {
        ...state,
        signerAddress: payload,
      };
    default:
      return state;
  }
};
