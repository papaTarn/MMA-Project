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
        <Content className="container" style={{ marginBottom: '20px', padding: '20px' }}>
          <Category />
          <Recommend />
        </Content>
      </Layout>
    </React.Fragment>
  );
}