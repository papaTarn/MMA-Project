'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Pagination, Flex, Spin, Button, Avatar, List } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import Link from 'next/link';

// Import Service
import { getProductListByCate, setFavourite } from '@/services/productService';

// import Interface
import { ListResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';

// import Component
import FlagRecommend from '@/components/ui/FlagRecommend';
import CardProduct from '@/components/ui/cardProduct';
import { useParams, useRouter } from 'next/navigation';
import { getAllCategory } from '@/services/masterService';

const { Header, Content } = Layout;
const { Meta } = Card;
const urlImg = 'http://localhost:3001/images/';

export default function ProductCategoryPage() {
  const params = useParams<{ id: string; }>()
  const router = useRouter();
  const [product, setProduct] = useState<ProductItem[]>([]);
  const [productResult, setProductResult] = useState<ListResponse>();
  const [category, setCategory] = useState<any>([]);
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [cate, setCate] = useState<number>();

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page);
    searchProductListByCate(page);
  };

  const handleItemClick = (id: number) => {
    router.push(`/categorys/${id}`);
  };

  const searchCategoryGetAll = async () => {
    try {
      const data = await getAllCategory();
      setCategory(data.result);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    } finally {
      setLoading(false);
    }
  };

  const searchProductListByCate = async (currentPage: number, id?: number) => {
    try {
      let items = {
        cateId: id ?? params.id,
        page: currentPage,
        pageSize: 10,
      };
      setLoading(true)
      const data = await getProductListByCate(items);
      setProductResult(data);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchCategoryGetAll();
    searchProductListByCate(0);
  }, []);

  useEffect(() => {
    if (productResult?.isSuccess) {
      if (productResult.result.list) {
        setProduct(productResult.result.list);
        setTotalRecord(productResult.result.totalRecord);
      }
    }
  }, [productResult, cate]);

  return (
    <React.Fragment>
      <Spin tip="Loading..." spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Col span={4}>
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <div>
                <label>หมวดหมู่ทั้งหมด</label>
              </div>
            </Col>
            <List
              size="small"
              dataSource={category}
              renderItem={(item: any) => <List.Item onClick={() => handleItemClick(item.id)}>{item.name}</List.Item>}
              style={{ marginTop: '1.25rem' }}
            />
          </Col>
          <Col span={20}>
            <Row style={{ marginTop: '1.25rem' }}>
              <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <label>รายการสินค้า</label>
                </div>
                <div className="gap-2">
                  <label>จำนวนสินค้าทั้งหมด </label>
                  <label>{totalRecord}</label>
                  <label> รายการ</label>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
              <CardProduct recommend={product} current={current} onClickReturn={searchProductListByCate}></CardProduct>
            </Row>
            <Flex vertical align="flex-end" justify="flex-start" style={{ padding: 32 }}>
              <Pagination current={current} onChange={onChange} total={totalRecord} />
            </Flex>
          </Col>
        </Row>
      </Spin>
    </React.Fragment>
  );
}