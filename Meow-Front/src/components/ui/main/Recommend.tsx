'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Pagination, Flex, Spin, Button, Avatar } from "antd";
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
import FlagRecommend from '@/components/ui/FlagRecommend';
import { notoSansThai } from '@/components/ui/fonts';

const { Header, Content } = Layout;
const { Meta } = Card;
const urlImg = 'http://localhost:3001/images/';

export default function Recommend() {
  const [recommend, setRecommend] = useState<ProductItem[]>([]);
  const [recommedResult, setRecommedResult] = useState<ListResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(true);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
    getRecommendAll(page);
  };

  const toggleFavorite = async (id: number) => {
    try {
      let items = {
        refProdId: id
      }

      setLoading(true);
      await setFavourite(items);
      getRecommendAll(current);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  };

  const getRecommendAll = async (currentPage: number) => {
    try {
      let items = {
        cateId: null,
        page: currentPage,
        pageSize: 10,
      }
      setLoading(true);
      const data = await getRecommend(items);
      setRecommedResult(data);
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
  }

  const productDetail = async (id: number) => {
    console.log(id)
  }

  useEffect(() => {
    getRecommendAll(0);
  }, [])

  useEffect(() => {
    if (recommedResult?.isSuccess) {
      if (recommedResult.result.list) {
        setRecommend(recommedResult.result.list)
        setTotalRecord(recommedResult.result.totalRecord)
      }
    }
  }, [recommedResult])

  return (
    <React.Fragment>
      <h2 style={{ background: '#ffeee0', padding: '0.85rem', marginTop: '1.25rem' }}>Recommended</h2>
      <Spin tip="Loading..." spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginTop: '1.25rem' }} className={notoSansThai.className}>
          {recommend.map(product => (
            <Col span={4} key={product.id}>
              {/* <Card
                hoverable
                cover={
                  <img alt={product.prodName} src={`${urlImg}${product.prodImg}`} width={240} height={160} style={{ objectFit: 'cover' }} />
                }
                actions={[
                  <span onClick={() => toggleFavorite(product.id)}>
                    {product.favFlag ? <HeartFilled style={{ color: '#F44336', fontSize: '1.2rem' }} /> : <HeartOutlined style={{ fontSize: '1.2rem' }} />}
                  </span>
                ]}
                extra={<a href="#">More</a>}>
                <Meta title={product.prodName} />
                <Meta title={`$${product.prodPrice} (ID: ${product.id})`} style={{ color: '#F44336' }} ></Meta>
              </Card>
              <div style={{
                position: 'absolute',
                top: '-0.5px',
                left: '7.5px',
                borderTopLeftRadius: '5px'
              }}><FlagRecommend /></div> */}

              <Card
                cover={
                  <img alt={product.prodName} src={`${urlImg}${product.prodImg}`} width={240} height={160} style={{ objectFit: 'cover' }} />
                }
                actions={[
                  <Link href={`/categorys/${product.id}`}>
                    More Detail
                  </Link>,
                  <span onClick={() => toggleFavorite(product.id)}>
                    {product.favFlag ? <HeartFilled style={{ color: '#F44336', fontSize: '1.2rem' }} /> : <HeartOutlined style={{ fontSize: '1.2rem' }} />}
                  </span>,
                ]}
                bodyStyle={{ padding: 7 }}
                className={notoSansThai.className}
              >
                <p>{product.prodName}</p>
                <p style={{ color: '#F44336', fontWeight: 'bold' }}>{`$${product.prodPrice} (ID: ${product.id})`}</p>
              </Card>
              <div style={{
                position: 'absolute',
                top: '-0.5px',
                left: '7.5px',
                borderTopLeftRadius: '5px'
              }}><FlagRecommend /></div>
            </Col>
          ))}
        </Row>
      </Spin>
      <Flex vertical align="flex-end" justify="flex-start" style={{ padding: 32 }}>
        <Pagination current={current} onChange={onChange} total={totalRecord} />
      </Flex>
    </React.Fragment >
  );
}
