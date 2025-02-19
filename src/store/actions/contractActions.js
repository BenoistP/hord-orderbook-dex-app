import * as contractActionTypes from '../actionTypes/contractActionTypes'
import { createNotification } from './uiActions'
import { setBalance, unsetBalances } from './balanceActions'
import { createContract, loadContracts } from '../../utils/contractsRegistryService'
import ERC20 from 'utils/contracts/ERC20.json'

export const connectToContracts = () => async (dispatch, getState) => {
  try {
    const contracts = await loadContracts()

    dispatch({
      type: contractActionTypes.SET_CONTRACTS,
      payload: contracts,
    })
    dispatch(setBalance(contracts['BUSD'], 'busdBalance'))
  } catch (error) {
    dispatch(createNotification('error', 'Something went wrong loading contract', 4000))
  }
}

export const connectToCurrentHPoolTokenContract = (hPoolTokenAddress) => async (dispatch) => {
  try {
    const contract = await createContract(hPoolTokenAddress, ERC20.abi)()
    const payload = {
      ...contract.methods,
      address: hPoolTokenAddress,
    }

    dispatch({
      type: contractActionTypes.SET_CURRENT_HPOOL_TOKEN_CONTRACT,
      payload,
    })
    dispatch(setBalance(payload, 'currentHPoolTokenBalance'))
  } catch (error) {
    dispatch(createNotification('error', 'Something went wrong loading contract', 4000))
  }
}

export const disconnectToContracts = () => async (dispatch) => {
  dispatch({
    type: contractActionTypes.REMOVE_CONTRACTS,
  })
  dispatch(unsetBalances())
}
