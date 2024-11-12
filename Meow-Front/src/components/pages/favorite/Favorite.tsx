'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { getFavoriteListByUserId } from '@/services/productService';
import {
  ProductResponse,
  ProductItem
} from '@/models/productModel';
import { Layout, Card, Col, Row, notification } from "antd";
const { Content } = Layout;

export default function Favorite() {
  const [favorite, setFavorite] = useState<ProductItem[]>([]);
  const [productResult, setProductResult] = useState<ProductResponse>();

  const categoryGetAll = async () => {
    try {
      const data = await getFavoriteListByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setProductResult(data);
    } catch (error) {

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
      </Content>
    </React.Fragment>
  )
}