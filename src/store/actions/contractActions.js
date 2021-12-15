import * as contractActionTypes from '../actionTypes/contractActionTypes';
import { createNotification } from './uiActions';
import { unsetBalances } from './balanceActions';
import { createContract, loadContracts } from '../../utils/contractsRegistryService';
import ERC20 from 'utils/contracts/ERC20.json';

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

export const connectToCurrentHPoolTokenContract = (hPoolTokenInfo) => async (dispatch) => {
  try {
    const contract = await createContract(hPoolTokenInfo.address, ERC20.abi)();
    const payload = {
        address: contract._address,
        ...contract.methods,
      };

    dispatch({
      type: contractActionTypes.SET_CURRENT_HPOOL_TOKEN_CONTRACT,
      payload,
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
