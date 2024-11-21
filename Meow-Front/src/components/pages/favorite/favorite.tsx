'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Badge, Space, Flex, Empty } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

// Import Service
import { getFavoriteListByUserId, setFavourite } from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';
import Link from 'next/link';

const { Content } = Layout;
const urlImg = 'http://localhost:3001/images/';

export default function FavoritePage() {
  const router = useRouter();
  const [favorite, setFavorite] = useState<ProductItem[]>([]);
  const [favoriteResult, setFavoriteResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState(true);

  const toggleFavorite = async (id: number) => {
    try {
      modalConfirm({
        title: 'Comfirm Save',
        content: 'confirm save ja',
        onOk: () => {
          onSave();
        },
        onCancel: () => { },
      });

      const onSave = async () => {
        let items = {
          refProdId: id,
        };

        setLoading(true);
        await setFavourite(items);
        searchFavorite();
      };
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  };

  const searchFavorite = async () => {
    try {
      const data = await getFavoriteListByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setFavoriteResult(data);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => {
          router.push('/');
        },
        onCancel: () => {
          router.push('/');
        },
      });
    }
  };

  useEffect(() => {
    searchFavorite();
  }, []);

  useEffect(() => {
    if (favoriteResult?.isSuccess) {
      setFavorite(favoriteResult.result);
    } else {
      setFavorite([]);
    }
  }, [favoriteResult]);

  return (
    <React.Fragment>
      {favorite.length == 0 ? (
        <Flex justify="center" align="center" style={{ height: '60vh' }}>
          <Empty description={'Data not Found !'} />
        </Flex>
      ) : (
        <Content className="container">
          <h2 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem', marginTop: '1.25rem' }}>Favorite</h2>
          {favorite.map(data => (
            <Flex gap="middle" align="start" vertical>
              <Card style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
                <Row gutter={[16, 16]} style={{ padding: 0 }}>
                  <Col span={3}>
                    <Link href={`/products/${data.id}`}>
                      <img
                        alt={data.prodImg}
                        src={`${urlImg}${data.prodImg}`}
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                        width={100}
                        height={100}
                      />
                    </Link>
                  </Col>

                  <Col span={20}>
                    <Flex gap={60} align="start" vertical>
                      <div style={{ display: 'flex' }}>
                        <span>{data.recommendFlag ? <FlagRecommend /> : ''}</span>
                        <span style={{ fontWeight: 'bold', paddingLeft: 10 }}>{`ID:${data.id} ${data.prodName}`}</span>
                      </div>
                      <div style={{ fontWeight: 'bold' }}>฿{data.prodPrice}</div>
                    </Flex>
                  </Col>
                  <Col span={1}>
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                      <span onClick={() => toggleFavorite(data.id)}>
                        <HeartFilled style={{ color: '#F44336', fontSize: '1.2rem', cursor: 'pointer' }} />
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Flex>
          ))}
        </Content>
      )}
    </React.Fragment>
  );
}
