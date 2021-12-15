import * as inputActionTypes from '../actionTypes/inputActionTypes';

export const handleInputChange = (inputName, inputValue) => ({
    type: inputActionTypes.SET_INPUT,
    payload: {
        inputName, inputValue
    }
});
