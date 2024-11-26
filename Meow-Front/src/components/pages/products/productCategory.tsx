'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Pagination, Flex, Spin, Button, Avatar, List, Empty } from 'antd';
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
  const router = useRouter();
  const params = useParams<{ id: string; }>();
  const [product, setProduct] = useState<ProductItem[]>([]);
  const [productResult, setProductResult] = useState<ListResponse>();
  const [category, setCategory] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Modal, Notification
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page);
    searchProductListByCate(page);
  };

  const searchCategoryGetAll = async () => {
    try {
      const data = await getAllCategory();
      if (data.result && params.id) {
        const itemIndex = data.result.findIndex((item: any) => item.id === Number(params.id));
        setActiveIndex(itemIndex >= 0 ? itemIndex : null);
      }

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
  }, [productResult, category]);

  const handleClick = (index: number, itemId: number) => {
    setActiveIndex(index);
    router.push(`/categorys/${itemId}`);
  };

  return (
    <React.Fragment>
      <Spin tip="Loading..." spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Col span={4}>
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <strong>หมวดหมู่ทั้งหมด</strong>
            </Col>
            <List
              size="small"
              dataSource={category}
              renderItem={(item: any, index) => (
                <List.Item
                  className={activeIndex === index ? 'active-item' : ''}
                  onClick={() => handleClick(index, item.id)}
                >{item.name}
                </List.Item>
              )}
              style={{ marginTop: '1.25rem' }}
            />
          </Col>
          <Col span={20}>
            <Row style={{ marginTop: '1.25rem' }}>
              <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>รายการสินค้า</strong>
                </div>
                <div className="gap-2">
                  <strong>จำนวนสินค้าทั้งหมด </strong>
                  <strong>{totalRecord}</strong>
                  <strong> รายการ</strong>
                </div>
              </Col>
            </Row>
            {product.length == 0 ? (
              <Flex justify="center" align="center" style={{ minHeight: '60vh' }}>
                <Empty description={'Data not Found !'} />
              </Flex>
            ) : (
              <Content>
                <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }}>
                  <CardProduct recommend={product} current={current} onClickReturn={searchProductListByCate}></CardProduct>
                </Row>
                <Flex vertical align="flex-end" justify="flex-start" style={{ padding: 32 }}>
                  <Pagination current={current} onChange={onChange} total={totalRecord} />
                </Flex>
              </Content>
            )}
          </Col>
        </Row>
      </Spin>
    </React.Fragment>
  );
}