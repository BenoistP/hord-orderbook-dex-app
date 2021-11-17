import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateNotifications } from '../../store/actions/uiActions';
import closeIcon from '../../assets/notifications/x.png';

const Notifications = ({
  notificationsList,
  position,
  updateNotifications,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationsList.length > 0) {
        deleteToast(notificationsList[0].id);
      }
    }, notificationsList[0]?.deleteNotificationInMs);

    return () => {
      clearInterval(interval);
    };
  }, [notificationsList]);

  const deleteToast = (id) => {
    const updatedOfNotificationsList = notificationsList.filter(
      (notification) => notification.id !== id,
    );

    updateNotifications(updatedOfNotificationsList);
  };

  return (
    <>
      <div className={`notification-container ${position}`}>
        {notificationsList.map((toast, i) => (
          <div
            key={i}
            className={`notification ${toast.type} toast ${position}`}
          >
            <img
              src={closeIcon}
              onClick={() => deleteToast(toast.id)}
              alt='Close icon'
              className='notification-close-icon'
            />
            <div className='notification-image'>
              <img src={toast.icon} alt='Notification icon' />
            </div>
            <div>
              <p className='notification-title'>{toast.title}</p>
              <p className='notification-message'>{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notificationsList: state.ui.notificationsList,
  };
};

export default connect(mapStateToProps, { updateNotifications })(Notifications);
