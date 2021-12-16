import * as walletActionTypes from '../actionTypes/walletActionTypes'

import { LS_ACCOUNT } from '../../utils/constants/general'

localStorage.getItem(LS_ACCOUNT)

const initialState = {
  connectingWallet: false,
  connectingWalletAccountType: '',

  connectingWalletProvider: false,
  connectingWalletProviderError: '',

  account: '',
  accountType:
    // lsAccountType ||
    '',
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case walletActionTypes.CONNECT_WALLET_START:
      return {
        ...state,
        connectingWallet: true,
        connectingWalletAccountType: payload,
      }

    case walletActionTypes.CONNECT_WALLET_END:
      return {
        ...state,
        connectingWallet: false,
        connectingWalletAccountType: '',
      }

    case walletActionTypes.CONNECT_WALLET_PROVIDER:
      return {
        ...state,
        connectingWalletProvider: true,
        connectingWalletProviderError: '',
      }

    case walletActionTypes.CONNECT_WALLET_PROVIDER_SUCCESS:
      return {
        ...state,
        connectingWalletProvider: false,
        connectingWalletProviderError: '',
        ...payload,
      }

    case walletActionTypes.CONNECT_WALLET_PROVIDER_FAILURE:
      return {
        ...state,
        connectingWalletProvider: false,
        connectingWalletProviderError: payload,
      }

    case walletActionTypes.CLEAR_ACCOUNT:
      return {
        ...state,
        account: '',
        accountType: '',
      }

    default:
      return state
  }
}
