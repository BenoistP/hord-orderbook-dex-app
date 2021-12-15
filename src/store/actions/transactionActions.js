import * as transactionActionTypes from '../actionTypes/transactionActionTypes';

export const setOpenOrders = (orders) => async (dispatch, getState) => {
    const signerAddress = getState().wallet.account;
    const filteredOpenOrders = orders.filter((order) => order.owner === signerAddress)
    dispatch({
        type: transactionActionTypes.SET_OPEN_ORDERS,
        payload: filteredOpenOrders
    })
};