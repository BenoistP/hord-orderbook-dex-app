import { useContractReader } from 'utils/contractReader';
import { WeiToEth } from 'utils/web3Service';
import * as balanceActionTypes from '../actionTypes/balanceActionTypes';

export const setBalance = (contract, tokenName) => async (dispatch, getState) => {
  const signerAddress = getState().wallet.account;
  const weiAmountOfTokens = await useContractReader(contract, 'balanceOf', [signerAddress]);
  const ethAmountOfTokens = WeiToEth(weiAmountOfTokens);
  dispatch({
   type: balanceActionTypes.SET_BALANCE,
   payload: {balance: ethAmountOfTokens, tokenName},
  });
}
  
export const unsetBalances = () => ({
  type: balanceActionTypes.REMOVE_BALANCES,
});
