import React from 'react';
import { Button, Modal } from 'antd';

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
  const confirm = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.success({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
      cancelButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
      closable: false,
      keyboard: false,
      // footer: null,
    });
  };

  const warning = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.warning({
      title: title,
      content: content,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
      onOk: onOk,
      onCancel: onCancel,
    });
  };

  const error = ({
    title,
    content,
    onOk,
    onCancel,
  }: ModalProps) => {
    Modal.error({
      title: title,
      content: content,
      width: '520px',
      height: '150px',
      okButtonProps: { style: { borderRadius: '6px' }, className: 'h-8 font-semibold' },
      onOk: onOk,
      onCancel: onCancel,
    });
  };

  return { confirm, warning, error };
};

export default useModal;