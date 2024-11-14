'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React from "react";
import { Layout, Col, Row, List } from 'antd';

// Import Component
import Banner from '@/components/ui/main/Banner';
import Recommend from '@/components/ui/main/Recommend';

const data = [
  'หมวดหมู่ทั้งหมด',
  'Food & Medicine',
  'Home & Item',
  'Cleaning Product',
  'Other',
];

export default function Page() {
  return (
    <React.Fragment>
      <Banner />
      <Layout className="bg-all">
        <Row gutter={[16, 16]} style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Col span={4}>
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col span={20}>
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label>รายการสินค้า</label>
              </div>
              <div className="gap-2">
                <label>จำนวนสินค้าทั้งหมด</label>
                <label>XX</label>
                <label>รายการ</label>
              </div>
            </Col>
            <Recommend />
          </Col>
        </Row>
      </Layout>
    </React.Fragment>
  );
}
