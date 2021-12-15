import * as inputActionTypes from '../actionTypes/inputActionTypes';

const initialState = {
    price: 0,
    amount: 0, 
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case inputActionTypes.SET_INPUT:
      return {
        ...state,
        [payload.inputName]: payload.inputValue,
      };
    default:
      return state;
  }
};
