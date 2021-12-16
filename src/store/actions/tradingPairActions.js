import { hpoolList } from 'utils/mockData'
import * as tradingPairActionTypes from '../actionTypes/tradingPairActionTypes'

export const setTradingPairsInformation = () => async (dispatch, getState) => {
  // TODO: get all hpool tokens from BACKEND with hpool information

  // For now only mockdata
  dispatch({
    type: tradingPairActionTypes.SET_HPOOL_TOKENS_LIST,
    payload: hpoolList,
  })
  dispatch({
    type: tradingPairActionTypes.SET_CURRENT_HPOOL_TOKEN,
    payload: hpoolList[0],
  })
}

export const changeCurrentHPoolToken = (hPoolTokenName) => async (dispatch, getState) => {
  const hPoolToken = getState().tradingPair.hPoolTokensList.filter((hPoolToken) => hPoolToken.name === hPoolTokenName)
  dispatch({
    type: tradingPairActionTypes.SET_CURRENT_HPOOL_TOKEN,
    payload: hPoolToken[0],
  })
}
