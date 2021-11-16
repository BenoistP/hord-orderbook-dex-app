import * as uiActionTypes from '../actionTypes/uiActionTypes';
import successIcon from '../../assets/notifications/success-icon.png';
import errorIcon from '../../assets/notifications/error-icon.png';

export const startAction = () => ({
  type: uiActionTypes.START_ACTION,
});

export const stopAction = () => ({
  type: uiActionTypes.STOP_ACTION,
});

export const setContractsLoadedAlready = (contractsLoaded) => ({
  type: uiActionTypes.SET_CONTRACTS_LOADED_ALREADY,
  payload: contractsLoaded,
});

export const setError = (message) => (dispatch) => {
  dispatch({
    type: uiActionTypes.SET_ERROR,
    payload: message,
  });

  return dispatch(stopAction());
};

export const createNotification = (type, text, deleteNotificationInMs) => {
  const id = Math.floor(Math.random() * 101 + 1);
  let toastProperties;

  switch (type) {
    case 'success':
      toastProperties = {
        id,
        title: 'Success',
        description: text,
        icon: successIcon,
        deleteNotificationInMs,
        type,
      };
      break;
    case 'error':
      toastProperties = {
        id,
        title: 'Error',
        description: text,
        icon: errorIcon,
        deleteNotificationInMs,
        type,
      };
      break;
    case 'info':
      toastProperties = {
        id,
        title: 'Info',
        description: text,
        icon: successIcon,
        deleteNotificationInMs,
      };
      break;
    case 'warning':
      toastProperties = {
        id,
        title: 'Warning',
        description: text,
        icon: successIcon,
        deleteNotificationInMs,
      };
      break;

    default:
      toastProperties = [];
      break;
  }

  return {
    type: uiActionTypes.CREATE_NOTIFICATION,
    payload: toastProperties,
  };
};

export const updateNotifications = (updatedNotificationList) => {
  return {
    type: uiActionTypes.UPDATE_NOTIFICATIONS,
    payload: updatedNotificationList,
  };
};
