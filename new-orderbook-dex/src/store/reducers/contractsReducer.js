import * as types from '../actionTypes/contractActionTypes';

const initialState = {
  signerAddress: 'Not connected',
  LpUniswapTokenFarmContract: false,
  LpSakeswapTokenFarmContract: false,
  UmiTokenFarmContract: false,
  UmiTokenContract: false,
  LpUniswapContract: false,
  LpSakeswapContract: false,
  ERC1155Contract: false,
  NftMinterContract: false,
  provider: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTRACT:
      return {
        ...state,
        signerAddress: action.payload.signerAddress,
        provider: action.payload.provider,
        ...action.payload.newContracts,
      };
    case types.REMOVE_CONTRACT:
      return {
        ...state,
        signerAddress: 'Not connected',
        LpUniswapTokenFarmContract: false,
        LpSakeswapTokenFarmContract: false,
        UmiTokenFarmContract: false,
        UmiTokenContract: false,
        LpUniswapContract: false,
        LpSakeswapContract: false,
        ERC1155Contract: false,
      };
    case types.ADD_SIGNERADDRESS:
      return {
        ...state,
        signerAddress: action.payload,
      };
    default:
      return state;
  }
};
