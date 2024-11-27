'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React from 'react';
import { Layout } from 'antd';

// Import Component
import Banner from '@/components/pages/home/Banner';
import Category from '@/components/pages/home/Category';
import Recommend from '@/components/pages/home/Recommend';
const { Content } = Layout;

export default function LandingPage() {
  return (
    <React.Fragment>
      <Banner />
      <Layout className="bg-all">
        <Content className="container">
          <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>Categories</h3>
          <Category />
          <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem', marginTop: '1.25rem' }}>Recommended</h3>
          <Recommend />
        </Content>
      </Layout>
    </React.Fragment>
  );
}
