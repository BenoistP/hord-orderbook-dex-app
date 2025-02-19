import { useContractReader } from 'utils/contractReader'
import { WeiToEth } from 'utils/web3Service'
import * as balanceActionTypes from '../actionTypes/balanceActionTypes'

export const setBalance = (contract, tokenName) => async (dispatch, getState) => {
  const signerAddress = getState().wallet.account
  const weiAmountOfTokens = await useContractReader(contract, 'balanceOf', [signerAddress])
  if (!weiAmountOfTokens.error) {
    const ethAmountOfTokens = Number(WeiToEth(weiAmountOfTokens))
    dispatch({
      type: balanceActionTypes.SET_BALANCE,
      payload: { balance: ethAmountOfTokens, tokenName },
    })
  }
}

export const unsetBalances = () => ({
  type: balanceActionTypes.REMOVE_BALANCES,
})
