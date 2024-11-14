'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React from 'react';
import { Layout } from 'antd';

// Import Component
import Banner from '@/components/ui/main/Banner';
import Category from '@/components/ui/main/Category';
import Recommend from '@/components/ui/main/Recommend';
import { notoSansThai } from '@/components/ui/fonts';

const { Content } = Layout;

export default function Page() {
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
