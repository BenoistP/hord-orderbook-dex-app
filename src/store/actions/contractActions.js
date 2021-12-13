import * as contractActionTypes from '../actionTypes/contractActionTypes';
import { createNotification } from './uiActions';
import { unsetBalances } from './balanceActions';
import { loadContracts } from '../../utils/contractsRegistryService';

export const connectToContracts = () => async (dispatch) => {
  try {
    const contracts = await loadContracts();

    dispatch({
      type: contractActionTypes.SET_CONTRACTS,
      payload: contracts,
    });
  } catch (error) {
    dispatch(createNotification('error', 'Something went wrong loading contract', 4000));
  }
};

export const disconnectToContracts = () => async (dispatch) => {
  dispatch({
    type: contractActionTypes.REMOVE_CONTRACTS,
  });
  dispatch(unsetBalances());
};
