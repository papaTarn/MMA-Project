'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import Link from 'next/link';
import { URL } from '@/shared/constant/url.const';
import useApi from '@/hooks/useApi';

const { Meta } = Card;

export default function Category() {
  type ReturnResponse = {
    message: string;
    result: object;
  }

  const api = useApi()
  const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV1
  const [category, setCategory] = useState<any>([])
  const urlImg = 'http://localhost:3001/images/';

  const categoryGetAll = async () => {
    try {
      const data: ReturnResponse | undefined = await api.api(`${urlapi}${URL.CategoryGetAll}`, "GET");
      console.log(data)
      if (data) {
        setCategory(data.result)
      }
    } catch (error) {
      console.error("Error fetching speed:", error);
    }
  }

  useEffect(() => {
    categoryGetAll()
  }, [])

  return (
    <React.Fragment>
      <h2 style={{ background: '#ffeee0', padding: '0.85rem' }}>Categories</h2>
      <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
        {category?.map((data: any) => (
          <Col span={4} key={data.id}>
            <Link href={`/categorys/${data.id}`} >
              <Card className='card-cate' hoverable cover={<img alt={data.cateName} src={`${urlImg}${data.id === 1 ? 'food.png' : data.id === 2 ? 'house_cat.png' : data.id === 3 ? 'soap-bottle.png' : 'kitty.png'}`} style={{ objectFit: 'none', height: '100px' }} />}>
                <Meta title={data.categoryName} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
