import * as uiActionTypes from '../actionTypes/uiActionTypes'

const initialState = {
  loading: false,
  error: false,
  notificationsList: [],
  contractsLoadedAlready: false, // this indicates if we already loaded all contract once
}

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case uiActionTypes.START_ACTION:
      return {
        ...state,
        loading: true,
      }
    case uiActionTypes.STOP_ACTION:
      return {
        ...state,
        loading: false,
      }
    case uiActionTypes.SET_ERROR:
      return {
        ...state,
        error: payload,
      }
    case uiActionTypes.SET_CONTRACTS_LOADED_ALREADY:
      return {
        ...state,
        contractsLoadedAlready: payload,
      }
    case uiActionTypes.CREATE_NOTIFICATION:
      return {
        ...state,
        notificationsList: [...state.notificationsList, payload],
      }
    case uiActionTypes.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notificationsList: payload,
      }
    default:
      return state
  }
}

export default uiReducer
