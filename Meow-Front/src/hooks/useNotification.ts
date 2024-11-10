import { App } from 'antd';

interface NotificationParams {
  message: string;
  onClose?: () => void;
}

const useNotification = () => {
  const { notification } = App.useApp();

  const info = ({ message, onClose }: NotificationParams) => {
    notification.destroy();
    notification.info({
      message: 'Notification Info',
      description: message,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const warning = ({ message, onClose }: NotificationParams) => {
    notification.destroy();
    notification.warning({
      message: 'Notification Warning',
      description: message,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const success = ({ message, onClose }: NotificationParams) => {
    notification.destroy();
    notification.success({
      message: 'Notification Success',
      description: message,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  const error = ({ message, onClose }: NotificationParams) => {
    notification.destroy();
    notification.error({
      message: 'Notification Error',
      description: message,
      pauseOnHover: true,
      onClose: () => onClose,
    });
  };

  return { success, info, warning, error };
};

export default useNotification;
