'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Flex, Spin, Button, Input, Select, InputNumber, Typography } from 'antd';
import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import Service
import { addCart, getProductInfo, setFavourite } from '@/services/productService';
import { useParams } from 'next/navigation';
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import { ProductResponse, ProductItem } from '@/models/productModel';
import FlagRecommend from '@/components/ui/FlagRecommend';


const { Header, Content } = Layout;
const { Meta } = Card;
const { Option } = Select;
const { Title } = Typography;
const urlImg = 'http://localhost:3001/images/';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string; }>()

  const [product, setProduct] = useState<ProductItem[]>([]);
  const [productResult, setProductResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState<number>(1); // จำนวนเริ่มต้นเป็น 1
  const prodPrice = productResult?.result[0].prodPrice ?? 0
  const totalPrice = quantity * prodPrice;

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const toggleFavorite = async (id: number) => {
    try {
      let items = {
        refProdId: id,
      };

      setLoading(true);
      await setFavourite(items);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  };

  const addToCart = async (id: number, qty: number, status?: string) => {
    try {
      let items = {
        refProdId: id,
        qty: qty
      };

      setLoading(true);
      const data = await addCart(items);
      if (data.isSuccess) {
        if (status) {
          router.push('/products/purchase');
        } else {
          success({
            message: 'Successfully',
            description: data.message,
          });
        }
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

  const buyNow = async (id: number, qty: number) => {
    try {
      let items = {
        refProdId: id,
        qty: qty
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

  const searchProductInfo = async () => {
    try {
      setLoading(true);
      const data = await getProductInfo(params.id);
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
    searchProductInfo();
  }, []);

  useEffect(() => {
    if (productResult?.isSuccess) {
      setProduct(productResult.result);
    }
  }, [productResult]);

  return (
    <React.Fragment>
      <Content className="container">
        {product.map(data => (
          <Row style={{ padding: 0, width: '100%' }}>
            <Col span={5}>
              <img
                alt={data.prodImg}
                src={`${urlImg}${data.prodImg}`}
                style={{ borderRadius: '5px', maxWidth: '95%' }}
              />
            </Col>

            <Col span={18}>
              <div style={{ display: 'flex' }}>
                <span>{data.recommendFlag ? <FlagRecommend /> : ''}</span>
                <span style={{ fontWeight: 'bold' }}>{`ID:${data.id} ${data.prodName}`}</span>
              </div>
              <h3 style={{ background: '#ffeee0', marginTop: '1rem', width: '100%' }}>รายละเอียดสินค้า</h3>
              <label>${data.prodDetail}</label>
              <Flex gap="small" wrap justify="flex-end" align="center">
                <div style={{ margin: '20px 0' }}>
                  <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Quantity:</span>
                  <InputNumber
                    min={1}
                    value={quantity}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={value => handleQuantityChange(value || 1)} // ถ้า value เป็น null จะตั้งค่าเป็น 1
                  />
                  <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#ff4d00' }}>ราคา: ฿{data.prodPrice}</span>
                </div>
              </Flex>

              <Flex gap="small" wrap justify="flex-end" align="center">
                <Button color="danger" variant="outlined" icon={<ShoppingCartOutlined />} iconPosition="start" onClick={() => addToCart(data.id, quantity)}>
                  Add To Cart
                </Button>
                <Button onClick={() => addToCart(data.id, quantity, 'Buy')}>
                  Buy Now
                </Button>
              </Flex>
            </Col>

            <Col span={1}>
              <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <span onClick={() => toggleFavorite(data.id)}>
                  {data.favFlag ? (
                    <HeartFilled style={{ color: '#F44336', fontSize: '1.2rem' }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: '1.2rem' }} />
                  )}
                </span>
              </div>
            </Col>
          </Row>
        ))}
      </Content>
    </React.Fragment>
  )
}