import React from 'react';
import { Button, Modal } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

interface ModalProps {
  title: React.ReactNode;
  content: React.ReactNode;
  okText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const useModal = () => {
  const modalConfirm = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.confirm({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
      cancelButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
    });
  };

  const modalInfo = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.info({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
    });
  };

  const modalWarning = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.warning({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
    });
  };

  const modalError = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.error({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
    });
  };

  return { modalConfirm, modalInfo, modalWarning, modalError };
};

export default useModal;