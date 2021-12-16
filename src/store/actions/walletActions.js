import configJson from '../../config/config.json'
import { getAccount, web3WalletConnector } from '../../utils/walletService'
import { setupWeb3 } from '../../utils/web3Service'
import {
  CONNECT_WALLET_START,
  CONNECT_WALLET_END,
  CONNECT_WALLET_PROVIDER,
  CONNECT_WALLET_PROVIDER_SUCCESS,
  CONNECT_WALLET_PROVIDER_FAILURE,
  CLEAR_ACCOUNT,
} from '../actionTypes/walletActionTypes'
import { LS_ACCOUNT } from '../../utils/constants/general'
// import { closeModal } from './modalActions';
import { wait } from '../../utils/utilsService'

const postLogin = () => () => {}

export const onWalletConnectRequestAction = (accountType) => (dispatch) => {
  dispatch({ type: CONNECT_WALLET_START, payload: accountType })
  dispatch({ type: CONNECT_WALLET_PROVIDER })
}

export const onWalletConnectSuccessAction =
  ({ provider, account, connectionType }) =>
  async (dispatch, getState) => {
    setupWeb3(provider)
    localStorage.setItem(LS_ACCOUNT, connectionType)
    dispatch({
      type: CONNECT_WALLET_PROVIDER_SUCCESS,
      payload: {
        account,
        accountType: connectionType,
        network: configJson.network,
      },
    })

    if (getState().wallet.account) await dispatch(postLogin())

    dispatch({ type: CONNECT_WALLET_END })
  }

export const onWalletConnectErrorAction = (err) => (dispatch) => {
  dispatch({ type: CONNECT_WALLET_PROVIDER_FAILURE, payload: err.message })
  setupWeb3()
}

export const onWalletDisconnectAction = () => (dispatch) => {
  dispatch({ type: CLEAR_ACCOUNT })
  localStorage.removeItem(LS_ACCOUNT)
}

/**
 * Tries not silent login for the selected account type
 *
 * @param accountType {String}
 *
 * @return {Function}
 */
export const normalLogin = (accountType) => async (dispatch, getState) => {
  dispatch({ type: CONNECT_WALLET_START, payload: accountType })
  dispatch({ type: CONNECT_WALLET_PROVIDER })
  try {
    if (!web3WalletConnector.mounted) {
      await wait(500)
    }
    const provider = await web3WalletConnector.connect({
      rpcUrl: configJson.rpcUrl,
      networkId: configJson.network,
      connectionType: accountType,
    })
    setupWeb3(provider)
    const account = await getAccount()
    localStorage.setItem(LS_ACCOUNT, web3WalletConnector.connectionType)

    dispatch({
      type: CONNECT_WALLET_PROVIDER_SUCCESS,
      payload: {
        account,
        accountType: web3WalletConnector.connectionType,
        network: configJson.network,
      },
    })
  } catch (err) {
    dispatch({ type: CONNECT_WALLET_PROVIDER_FAILURE, payload: err.message })
    setupWeb3()
  }

  // dispatch(setLsValuesToReducer());
  if (getState().wallet.account) await dispatch(postLogin())

  dispatch({ type: CONNECT_WALLET_END })
}

/**
 * If the user has already once successfully added an account this will
 * try a silent login for that account type.
 *
 * @return {Function}
 */
export const silentLogin = () => async (dispatch, getState) => {
  const { accountType, connectingWallet, account } = getState().wallet
  console.log('SILENT_LOGIN', accountType)
  if (!accountType || connectingWallet || account) return

  dispatch({ type: CONNECT_WALLET_START, payload: accountType })

  try {
    if (accountType) {
      await dispatch(normalLogin(accountType))
    }
  } catch (err) {
    setupWeb3()
  }

  if (getState().wallet.account) await dispatch(postLogin())

  // dispatch(setLsValuesToReducer());
  dispatch({ type: CONNECT_WALLET_END })
}

export const logOut = () => async (dispatch, getState) => {
  const { modalType } = getState().modal
  dispatch({ type: CLEAR_ACCOUNT })
  if (modalType !== '') {
    // dispatch(closeModal());
  }
  dispatch(normalLogin())
  localStorage.removeItem(LS_ACCOUNT)
}
