import * as uiActionTypes from '../actionTypes/uiActionTypes';

const initialState = {
  loading: false,
  error: false,
  notificationsList: [],
  contractsLoadedAlready: false, // this indicates if we already loaded all contract once
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiActionTypes.START_ACTION:
      return {
        ...state,
        loading: true,
      };
    case uiActionTypes.STOP_ACTION:
      return {
        ...state,
        loading: false,
      };
    case uiActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case uiActionTypes.SET_CONTRACTS_LOADED_ALREADY:
      return {
        ...state,
        contractsLoadedAlready: action.payload,
      };
    case uiActionTypes.CREATE_NOTIFICATION:
      return {
        ...state,
        notificationsList: [...state.notificationsList, action.payload],
      };
    case uiActionTypes.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notificationsList: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
