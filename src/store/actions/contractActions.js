import * as contractActionTypes from '../actionTypes/contractActionTypes';
import getContract from '../../utils/loadContracts';
import { setError, setContractsLoadedAlready } from './uiActions';
import { unsetBalances, setBalances } from './balanceActions';

export const connectToContracts =
  (setListener = false) =>
  async (dispatch, getState) => {
    try {
      // get the smart contracts to be able to communicate with the blockchain
      const { signerAddress, newContracts, balances, provider, error } =
        await getContract(setListener);

      if (error) {
        return dispatch(setError(error));
      }

      dispatch({
        type: contractActionTypes.GET_CONTRACT,
        payload: {
          signerAddress,
          newContracts,
          provider,
        },
      });
      const contractsLoadedAlready = getState().ui.contractsLoadedAlready;

      if (balances) {
        dispatch(setBalances(balances));
      }

      if (!contractsLoadedAlready) {
        setTimeout(() => dispatch(setContractsLoadedAlready(true)), 1000);
      }
      return dispatch(setError(false)); // reset error message if everything is alright
    } catch (error) {
      debugger
      // dispatch error message here
    }
  };

export const disconnectToContracts = () => async (dispatch) => {
  try {
    dispatch({
      type: contractActionTypes.REMOVE_CONTRACT,
    });

    dispatch(unsetBalances());
    dispatch(setContractsLoadedAlready(false));
  } catch (error) {
    console.log(error);
    // dispatch error message here
  }
};

export const addSigneraddress = (signerAddress) => ({
  type: contractActionTypes.ADD_SIGNERADDRESS,
  payload: signerAddress,
});
