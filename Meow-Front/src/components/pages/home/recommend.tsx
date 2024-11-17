'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Pagination, Flex, Spin, Button, Avatar } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import Link from 'next/link';

// Import Service
import { getRecommend, setFavourite } from '@/services/productService';

// import Interface
import { ListResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';

// import Component
import FlagRecommend from '@/components/ui/FlagRecommend';
import CardProduct from '@/components/ui/cardProduct';

const { Header, Content } = Layout;
const { Meta } = Card;
const urlImg = 'http://localhost:3001/images/';

export default function RecommendPage() {
  const [recommend, setRecommend] = useState<ProductItem[]>([]);
  const [recommedResult, setRecommedResult] = useState<ListResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(true);

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page);
    getRecommendAll(page);
  };

  const getRecommendAll = async (currentPage: number) => {
    try {
      let items = {
        cateId: null,
        page: currentPage,
        pageSize: 10,
      };
      setLoading(true);
      const data = await getRecommend(items);
      setRecommedResult(data);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => {},
        onCancel: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendAll(0);
  }, []);

  useEffect(() => {
    if (recommedResult?.isSuccess) {
      if (recommedResult.result.list) {
        setRecommend(recommedResult.result.list);
        setTotalRecord(recommedResult.result.totalRecord);
      }
    }
  }, [recommedResult]);

  return (
    <React.Fragment>
      <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Recommended</h2>
      <Spin tip="Loading..." spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
          <CardProduct recommend={recommend} current={current} onClickReturn={getRecommendAll}></CardProduct>
        </Row>
      </Spin>
      <Flex vertical align="flex-end" justify="flex-start" style={{ padding: 32 }}>
        <Pagination current={current} onChange={onChange} total={totalRecord} />
      </Flex>
    </React.Fragment>
  );
}
