// components/ModalComponent.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from 'antd';
import { orderHistoryById } from '@/services/productService';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import { ListOrderResponse, OrderDetail, OrderDetailResponse, OrderItem } from '@/models/productModel';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  userId: any;
  orderId: any;
}

const ModalPurchaseComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, userId, orderId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();

  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [orderDetailResult, setOrderDetailResult] = useState<OrderDetailResponse>();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const listData = {
        "userId": userId,
        "orderId": orderId,
      }
      console.log(listData)
      const data = await orderHistoryById(listData); // เรียกใช้ฟังก์ชันที่แยกไว้
      setOrderDetailResult(data)
      setLoading(false);
    } catch (err: any) {
      if (err.status == 403) {
        // const msg = masterData[0]?.find(x => x.code == 'W0004');
        // modalError({
        //   title: err?.message,
        //   content: msg?.value,
        //   onOk: () => {
        //     if (err.status == 403) {
        //       router.push('/');
        //     }
        //   },
        // });
      } else {
        modalError({
          title: err?.message,
          content: err?.description,
          onOk: () => { },
        });
      }
    }
  }, [userId, orderId]);

  return (
    <Modal
      title="Order Detail"
      open={isOpen}
      onCancel={onClose}
      onOk={onClose} // กำหนดการทำงานเมื่อกดปุ่ม OK
      width={'90%'}
    >
      <p>User ID: {userId}</p>
      <p>Order ID: {orderId}</p>
    </Modal>
  );
};

export default ModalPurchaseComponent;
