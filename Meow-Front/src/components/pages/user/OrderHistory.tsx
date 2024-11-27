'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Badge, Space, Flex, Empty, Button } from 'antd';
import { HeartFilled, HeartOutlined, ShopFilled, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import { addCart, setFavourite } from '@/services/productService';
import { getHistoryByUserId } from '@/services/profileService';

// import Interface
import { ProductResponse, ProductItem, HistoryItem, HistoryResponse } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';
import Link from 'next/link';
import { SizeType } from 'antd/es/config-provider/SizeContext';

const { Content } = Layout;
const urlImg = 'http://localhost:3001/images/';

export default function OrderHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem>()
  const [historyResult, setHistoryResult] = useState<HistoryResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState(true);

  const addToCart = async (id: number, qty: number) => {
    try {
      let items = {
        refProdId: id,
        qty: qty,
        status: 1
      };

      setLoading(true);
      const data = await addCart(items);
      if (data.isSuccess) {
        success({
          message: 'Successfully',
          description: data.message,
        });
      } else {
        warning({
          message: 'Warning',
          description: data.message,
        });
      }
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  };

  const searchPurchaseOrder = async () => {
    try {
      const data = await getHistoryByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setHistoryResult(data);
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
    if (historyResult?.isSuccess) {
      setHistory(historyResult.result);
    }
  }, [historyResult]);

  return (
    <React.Fragment>
      {history?.lastOrderGroup.length == 0 && history?.otherOrdersGroup.length == 0 ? (
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
            {history?.lastOrderGroup.map(data => (
              <Flex gap="middle" align="start" vertical>
                <Card style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
                  <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <div>
                        <label><ShopOutlined style={{ color: '#ff4d00' }} /> Bite of Wild Office Shop</label>
                      </div>
                      <div className="gap-2">
                        <label>วันที่สั่งซื้อ {new Date(data.createDate).toLocaleString('th-TH')}</label>
                      </div>
                    </Col>
                  </Row>
                  <hr style={{ marginTop: 5, marginBottom: 10 }}></hr>
                  <Row gutter={[16, 16]} style={{ padding: 0 }}>
                    <Col span={3}>
                      <Link href={`/products/${data.refProdId}`}>
                        <img
                          alt={data.prodImg}
                          src={`${urlImg}${data.prodImg}`}
                          style={{ objectFit: 'cover', borderRadius: '5px' }}
                          width={100}
                          height={100}
                        />
                      </Link>
                    </Col>

                    <Col span={17}>
                      <Flex gap={40} align="start" vertical>
                        <div>
                          <h4>{`(Order ID: ${data.id}) (ID: ${data.refProdId}) ${data.prodName}`}</h4>
                          <p>
                            {data.prodDetail.length > 80
                              ? `${data.prodDetail.substring(0, 80)}...`
                              : data.prodDetail}
                          </p>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>฿{`${data.prodPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</div>
                      </Flex>
                    </Col>

                    <Col span={4}>
                      <Flex align="flex-end" vertical>
                        <Button color="danger" variant="outlined" icon={<ShoppingCartOutlined />} iconPosition="start" onClick={() => addToCart(data.refProdId, 1)}>
                          Add To Cart
                        </Button>
                      </Flex>
                    </Col>
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
            {history?.otherOrdersGroup.map(data => (
              <Flex gap="middle" align="start" vertical>
                <Card style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
                  <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <div>
                        <label><ShopOutlined style={{ color: '#ff4d00' }} /> Bite of Wild Office Shop</label>
                      </div>
                      <div className="gap-2">
                        <label>วันที่สั่งซื้อ {new Date(data.createDate).toLocaleString('th-TH')}</label>
                      </div>
                    </Col>
                  </Row>
                  <hr style={{ marginTop: 5, marginBottom: 10 }}></hr>
                  <Row gutter={[16, 16]} style={{ padding: 0 }}>
                    <Col span={3}>
                      <Link href={`/products/${data.refProdId}`}>
                        <img
                          alt={data.prodImg}
                          src={`${urlImg}${data.prodImg}`}
                          style={{ objectFit: 'cover', borderRadius: '5px' }}
                          width={100}
                          height={100}
                        />
                      </Link>
                    </Col>

                    <Col span={17}>
                      <Flex gap={40} align="start" vertical>
                        <div>
                          <h4>{`(Order ID: ${data.id}) (ID: ${data.refProdId}) ${data.prodName}`}</h4>
                          <p>
                            {data.prodDetail.length > 80
                              ? `${data.prodDetail.substring(0, 80)}...`
                              : data.prodDetail}
                          </p>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>฿{`${data.prodPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</div>
                      </Flex>
                    </Col>

                    <Col span={4}>
                      <Flex align="flex-end" vertical>
                        <Button color="danger" variant="outlined" icon={<ShoppingCartOutlined />} iconPosition="start" onClick={() => addToCart(data.refProdId, 1)}>
                          Add To Cart
                        </Button>
                      </Flex>
                    </Col>
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
