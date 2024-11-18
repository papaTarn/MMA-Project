'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React from 'react';
import { Layout } from 'antd';

// Import Component
import Banner from '@/components/pages/home/banner';
import Category from '@/components/pages/home/category';
import Recommend from '@/components/pages/home/recommend';
const { Content } = Layout;

export default function LandingPage() {
  return (
    <React.Fragment>
      <Banner />
      <Layout className="bg-all">
        <Content className="container">
          <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Categories</h2>
          <Category />
          <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Recommended</h2>
          <Recommend />
        </Content>
      </Layout>
    </React.Fragment>
  );
}
