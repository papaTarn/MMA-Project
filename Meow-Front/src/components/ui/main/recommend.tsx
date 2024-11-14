'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row } from "antd";
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

// Import Service
import { getRecommend } from '@/services/productService';

// import Interface
import { ListResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';

const { Header, Content } = Layout;
const { Meta } = Card;
const urlImg = 'http://localhost:3001/images/';

export default function Recommend() {
  const [favorites, setFavorites] = useState<number[]>([]); // ระบุประเภทเป็น array ของ number
  const [recommend, setRecommend] = useState<ProductItem[]>([]);
  const [recommedResult, setRecommedResult] = useState<ListResponse>();
  const { success, errors, warning, info } = useNotification();
  const { confirm, error } = useModal();

  const toggleFavorite = (item: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(item) ? prevFavorites.filter(f => f !== item) : [...prevFavorites, item],
    );
  };

  const getRecommendAll = async () => {
    try {
      let items = {
        cateId: null,
        page: 1,
        pageSize: 10,
      }
      const data = await getRecommend(items); // เรียกใช้ฟังก์ชันที่แยกไว้
      setRecommedResult(data);
    } catch (err: any) {
      error({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  }

  useEffect(() => {
    getRecommendAll()
  }, [])

  useEffect(() => {
    if (recommedResult?.isSuccess) {
      if (recommedResult.result.list) {
        console.log(recommedResult.result.list)
        setRecommend(recommedResult.result.list)
      }
    }
  }, [recommedResult])

  return (
    <React.Fragment>
      <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Recommended</h2>
      <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
        {recommend.map(product => (
          <Col span={4} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.prodName} src={`${urlImg}${product.prodImg}`} />}
              actions={[
                <span onClick={() => toggleFavorite(product.id)}>
                  {/* {recommend.includes(product.id) ? <HeartTwoTone twoToneColor="#eb2f96" /> : <HeartOutlined />} */}
                </span>,
              ]}>
              <Meta title={product.prodName} description={product.prodPrice} />
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
