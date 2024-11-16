import { App, notification } from 'antd';

interface NotificationParams {
  message?: string;
  description?: string;
  onClose?: () => void;
}

const useNotification = () => {
  const info = ({ message, description, onClose }: NotificationParams) => {
    notification.info({
      message: message,
      description: description,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const warning = ({ message, description, onClose }: NotificationParams) => {
    notification.warning({
      message: message,
      description: description,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const success = ({ message, description, onClose }: NotificationParams) => {
    notification.success({
      message: message,
      description: description,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const errors = ({ message, description, onClose }: NotificationParams) => {
    notification.error({
      message: message,
      description: description,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  return { success, info, warning, errors };
};

export default useNotification;
