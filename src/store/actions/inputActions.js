import * as inputActionTypes from '../actionTypes/inputActionTypes';

export const handleChange = (inputName, inputValue) => ({
    type: inputActionTypes.SET_INPUT,
    payload: {
        inputName, inputValue
    }
});
