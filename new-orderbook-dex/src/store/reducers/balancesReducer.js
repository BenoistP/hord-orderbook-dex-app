import * as types from '../actionTypes/balanceActionTypes';
import { nftMainnetContractOne, nftMainnetContractTwo } from 'utils/constants';

const mockStakedNftIdObject = {
  // '0xAA0d091C775Ba170E8f9A198fCD3d51636F0e8b3': {}, // nft contract one
  // '0xe2EC046Fd4431301E72d1E03ed578C804cA9E8F3': {}, // nft contract two
  [nftMainnetContractOne]: {}, // nft contract one
  [nftMainnetContractTwo]: {}, // nft contract two
};

const initialState = {
  ethBalance: 0,
  umiBalance: 0,
  lpUniswapTokenFarmBalance: 0,
  lpSakeswapTokenFarmBalance: 0,
  umiTokenFarmBalance: 0,
  lpUniswapTokenFarmRewards: 0,
  lpSakeswapTokenFarmRewards: 0,
  umiTokenFarmRewards: 0,
  lpUniswapTokenFarmTotalStakedValue: 0,
  lpSakeswapTokenFarmTotalStakedValue: 0,
  umiTokenFarmTotalStakedValue: 0,
  totalLockedValue: 0,
  totalRewards: 0,
  lpUniswapTokenFarmAPY: 33, // 33% is normal staking reward (without NFT boost)
  lpSakeswapTokenFarmAPY: 33, // 33% is normal staking reward (without NFT boost)
  amountOfStakedNftIdLpUniswap: mockStakedNftIdObject,
  amountOfStakedNftIdLpSakeswap: mockStakedNftIdObject,
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
        umiBalance: 0,
        lpUniswapTokenFarmBalance: 0,
        lpSakeswapTokenFarmBalance: 0,
        umiTokenFarmBalance: 0,
        lpUniswapTokenFarmRewards: 0,
        lpSakeswapTokenFarmRewards: 0,
        umiTokenFarmRewards: 0,
        lpUniswapTokenFarmTotalStakedValue: 0,
        lpSakeswapTokenFarmTotalStakedValue: 0,
        umiTokenFarmTotalStakedValue: 0,
        totalLockedValue: 0,
        totalRewards: 0,
        lpUniswapTokenFarmAPY: 33, // 33% is normal staking reward (without NFT boost)
        lpSakeswapTokenFarmAPY: 33, // 33% is normal staking reward (without NFT boost)
        amountOfStakedNftIdLpUniswap: mockStakedNftIdObject,
        amountOfStakedNftIdLpSakeswap: mockStakedNftIdObject,
      };
    default:
      return state;
  }
};
