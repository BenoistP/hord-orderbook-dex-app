import { store } from 'index'
import { createNotification } from 'store/actions/uiActions'

export const useContractReader = async (
  contract,
  contractFunction,
  parameters = [],
  callMethod = (contractInstance) => contractInstance?.[contractFunction](...parameters)?.call(),
) => {
  let result
  try {
    result = await callMethod(contract)
  } catch (error) {
    result = { error: error.message }
    store.dispatch(createNotification('error', 'Something went wrong reading data from the blockchain.', 4000))
  }
  return result
}
