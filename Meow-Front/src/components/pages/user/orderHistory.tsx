'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Badge, Space, Flex, Empty } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

// Import Service
import { setFavourite } from '@/services/productService';
import { getHistoryByUserId } from '@/services/profileService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';

const { Content } = Layout;
const urlImg = 'http://localhost:3001/images/';

export default function OrderHistoryPage() {
  const router = useRouter();
  const [lastOrder, setLastOrder] = useState<ProductItem[]>([]);
  const [order, setOrder] = useState<ProductItem[]>([]);
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
        onCancel: () => {},
      });

      const onSave = async () => {
        let items = {
          refProdId: id,
        };

        setLoading(true);
        await setFavourite(items);
        searchPurchaseOrder();
      };
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => {},
        onCancel: () => {},
      });
    }
  };

  const searchPurchaseOrder = async () => {
    try {
      const data = await getHistoryByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
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
    searchPurchaseOrder();
  }, []);

  useEffect(() => {
    if (favoriteResult?.isSuccess) {
      const product = favoriteResult.result;
      const maxOrderId = Math.max(...product.map(product => product.id));
      const lastOrderGroup = product.filter(product => product.id === maxOrderId);
      const otherOrdersGroup = product.filter(product => product.id !== maxOrderId);

      setLastOrder(lastOrderGroup);
      setOrder(otherOrdersGroup);
    } else {
      setLastOrder([]);
      setOrder([]);
    }
  }, [favoriteResult]);

  return (
    <React.Fragment>
      {lastOrder.length == 0 ? (
        <Flex justify="center" align="center" style={{ height: '60vh' }}>
          <Empty description={'Data not Found !'} />
        </Flex>
      ) : (
        <Content className="container">
          <h2 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>การสั่งซื้อล่าสุด</h2>
          <Card style={{ width: '100%', marginTop: 16 }}>
            <Row>
              <Col span={24}>
                <h3>การสั่งซื้อล่าสุด</h3>
                <label>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</label>
                <hr style={{ marginTop: 10 }} />
              </Col>
            </Row>
            {lastOrder.map(data => (
              <Flex gap="middle" align="start" vertical>
                <Card hoverable style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
                  <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <label>รายการสินค้า</label>
                      </div>
                      <div className="gap-2">
                        <label>วันที่สั่งซื้อ {new Date(data.createDate).toLocaleString('th-TH')}</label>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} style={{ padding: 0 }}>
                    <Col span={3}>
                      <img
                        alt={data.prodImg}
                        src={`${urlImg}${data.prodImg}`}
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                        width={100}
                        height={100}
                      />
                    </Col>

                    <Col span={20}>
                      <Flex gap="large" align="start" vertical>
                        <div>฿{data.prodPrice}</div>
                      </Flex>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </Card>
              </Flex>
            ))}

            <Row style={{ marginTop: 50 }}>
              <Col span={24}>
                <h3>ประวัติการสั่งซื้อสินค้าสำเร็จ</h3>
                <hr style={{ marginTop: 10 }} />
              </Col>
            </Row>
            {order.map(data => (
              <Flex gap="middle" align="start" vertical>
                <Card hoverable style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
                  <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <label>รายการสินค้า</label>
                      </div>
                      <div className="gap-2">
                        <label>วันที่สั่งซื้อ {new Date(data.createDate).toLocaleString('th-TH')}</label>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} style={{ padding: 0 }}>
                    <Col span={3}>
                      <img
                        alt={data.prodImg}
                        src={`${urlImg}${data.prodImg}`}
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                        width={100}
                        height={100}
                      />
                    </Col>

                    <Col span={20}>
                      <Flex gap="large" align="start" vertical>
                        <div>฿{data.prodPrice}</div>
                      </Flex>
                    </Col>
                    <Col span={1}></Col>
                  </Row>
                </Card>
              </Flex>
            ))}
          </Card>
        </Content>
      )}
    </React.Fragment>
  );
}
