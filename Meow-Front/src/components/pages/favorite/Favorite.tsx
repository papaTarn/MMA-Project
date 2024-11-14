'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row } from "antd";

// Import Service
import { getFavoriteListByUserId } from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';

const { Content } = Layout;

export default function Favorite() {
  const [favorite, setFavorite] = useState<ProductItem[]>([]);
  const [productResult, setProductResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { confirm, error } = useModal()
  const router = useRouter();

  const categoryGetAll = async () => {
    try {
      const data = await getFavoriteListByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setProductResult(data);
    } catch (err: any) {
      error({
        title: err?.message,
        content: err?.description,
        onOk: () => {
          router.push('/')
        },
        onCancel: () => {
          router.push('/')
        },
      });

      // errors({
      //   message: error?.message,
      //   description: error?.description,
      // });
    }
  }

  useEffect(() => {
    categoryGetAll()
  }, [])

  useEffect(() => {
    if (productResult?.isSuccess) {
      setFavorite(productResult.result)
    }
  }, [productResult])

  return (
    <React.Fragment >
      <Content className="container" style={{ marginBottom: '20px', padding: '20px' }}>
        {favorite.map((data) => (
          <Card style={{ width: '100%' }} key={data.id}>
            <Row gutter={[16, 16]}>
              <Col span={6}>{data.prodName}</Col>
              <Col span={6}>{data.prodName}</Col>
              <Col span={6}>{data.prodName}</Col>
              <Col span={6}>{data.prodName}</Col>
            </Row>
          </Card>
        ))}

        {/* <Modal title="Basic Modal" open={true} footer={null} closable={false} keyboard={false} maskClosable={false} /> */}
        {/* <Modal visible={isVisible} /> */}
      </Content>
    </React.Fragment>
  )
}