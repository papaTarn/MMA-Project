'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useState } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Meta } = Card;

export default function Recommend() {
  const [favorites, setFavorites] = useState<number[]>([]); // ระบุประเภทเป็น array ของ number

  const toggleFavorite = (item: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(item) ? prevFavorites.filter(f => f !== item) : [...prevFavorites, item],
    );
  };

  interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
  }

  const products: Product[] = [
    { id: 1, name: 'Product 1', price: '$100', image: 'http://localhost:3001/images/240x160.png' },
    { id: 2, name: 'Product 2', price: '$200', image: 'http://localhost:3001/images/240x160.png' },
    { id: 3, name: 'Product 3', price: '$300', image: 'http://localhost:3001/images/240x160.png' },
    { id: 4, name: 'Product 4', price: '$400', image: 'http://localhost:3001/images/240x160.png' },
    { id: 5, name: 'Product 5', price: '$500', image: 'http://localhost:3001/images/240x160.png' },
    { id: 6, name: 'Product 6', price: '$600', image: 'http://localhost:3001/images/240x160.png' },
    { id: 7, name: 'Product 7', price: '$700', image: 'http://localhost:3001/images/240x160.png' },
    { id: 8, name: 'Product 8', price: '$800', image: 'http://localhost:3001/images/240x160.png' },
    { id: 9, name: 'Product 9', price: '$900', image: 'http://localhost:3001/images/240x160.png' },
    { id: 10, name: 'Product 10', price: '$1000', image: 'http://localhost:3001/images/240x160.png' },
  ];

  return (
    <React.Fragment>
      <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Recommended</h2>
      <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
        {products.map(product => (
          <Col span={4} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              actions={[
                <span onClick={() => toggleFavorite(product.id)}>
                  {favorites.includes(product.id) ? <HeartTwoTone twoToneColor="#eb2f96" /> : <HeartOutlined />}
                </span>,
              ]}>
              <Meta title={product.name} description={product.price} />
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
