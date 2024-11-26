'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Flex, Spin, Button, Input, Select, InputNumber, Typography, Empty, Table, Divider, TableColumnsType, Popconfirm, Image, Tooltip } from 'antd';
import { DeleteOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import { addCart, deleteCart, getCartByUserId, getFavoriteListByUserId, setFavourite } from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';
import { styleText } from 'util';
import Link from 'next/link';
import { Footer } from 'antd/es/layout/layout';
import { getAllMessage } from '@/services/masterService';
import { Master } from '@/models/masterModel';

const { Content } = Layout;
const { Title } = Typography;

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [cartResult, setCartResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState<boolean>(true);
  const urlImg = 'http://localhost:3001/images/';
  const [totalQty, setTotalQty] = useState<string>();
  const [data, setData] = useState<any>();

  const getMaster = async () => {
    try {
      const [msgList] = await Promise.all([getAllMessage()]);
      setData(msgList);
    } catch (error) {

    }
  }

  const searchCart = async () => {
    try {
      const data = await getCartByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setCartResult(data);
      const totalQty = data.result.reduce((sum, product) => sum + product.prodPrice, 0);
      let sum = totalQty.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      setTotalQty(sum)
      setLoading(false);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: data.msgList.find((x: any) => x.code == 'W0004'),
        onOk: () => {
          if (err.status == 403) {
            router.push('/');
          }
        }
      });
    }
  };

  const addToCart = async (id: number, qty: number, status?: number) => {
    try {
      let items = {
        refProdId: id,
        qty: qty,
        status: 2
      };

      setLoading(true);
      const data = await addCart(items);
      if (!data.isSuccess) {
        warning({
          message: 'Warning',
          description: data.message,
        });
      }
      setLoading(false);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCart(id); // เรียกใช้ฟังก์ชันที่แยกไว้
      searchCart();
      setLoading(false);
    } catch (err: any) {
      console.log(err)
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => {
          if (err.status == 403) {
            router.push('/');
          }
        }
      });
    }
  };

  useEffect(() => {
    searchCart();
    getMaster();
  }, []);

  useEffect(() => {
    if (cartResult?.isSuccess) {
      setCart(cartResult.result);
    } else {
      setCart([]);
    }
  }, [cartResult]);

  const columns = [
    {
      title: '',
      dataIndex: 'prodImg',
      key: 'prodImg',
      width: 100,
      render: (text: string, record: ProductItem) =>
        <Link href={`/products/${record.prodId}`}>
          <img src={`${urlImg}${text}`} alt="Product Image" width={100} height={100} style={{ objectFit: 'cover', borderRadius: '5px' }} />
        </Link>,
    },
    {
      title: '',
      dataIndex: 'prodDetail',
      key: 'prodDetail',
      width: 300,
      render: (_: string, record: ProductItem) => (
        <div>
          <h4>{`(Product ID: ${record.prodId}) (Card ID: ${record.id}) ${record.prodName}`}</h4>
          <p>
            {record.prodDetail.length > 80 ? `${record.prodDetail.substring(0, 80)}...` : record.prodDetail}
          </p>
        </div>
      ),
    },
    {
      title: 'ราคาต่อชิ้น',
      dataIndex: 'prodPrice',
      key: 'prodPrice',
      width: 150,
      align: 'right' as 'right',
      render: (value: number) => `฿${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    {
      title: 'จำนวน',
      dataIndex: 'qty',
      key: 'qty',
      width: 100,
      align: 'right' as 'right',
      render: (value: number, record: ProductItem) => (
        <InputNumber
          min={0}
          max={99}
          value={value}
          onChange={(newQty) => {
            if (newQty) {
              const newData = cart.map((item) => item.id === record.id ? { ...item, qty: newQty } : item);
              setCart(newData);
              addToCart(record.prodId, newQty, 2)
            } else if (newQty == 0) {
              modalConfirm({
                title: 'Confirmation',
                content: 'คุณต้องการลบสินค้านี้หรือไม่?',
                onOk: () => {
                  handleDelete(record.id)
                },
                onCancel() {

                },
              });
            }
          }}
        />
      ),
    },
    {
      title: 'ราคารวม',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'right' as 'right',
      render: (_: any, record: ProductItem) => `฿${(record.prodPrice * record.qty).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    {
      title: 'ลบ',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center' as 'center',
      render: (_: any, record: ProductItem) => (
        <Popconfirm
          title="คุณต้องการลบสินค้านี้หรือไม่?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Content className="container">
      <Spin tip="Loading..." spinning={loading} >
        <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>Cart</h3><br />
        <Table dataSource={cart} columns={columns} pagination={false} rowHoverable={false} rowKey="id" style={{ marginBottom: 50 }} />
      </Spin>
      <Footer style={{
        position: 'fixed',
        bottom: 0,
        width: '1200px',
        padding: '10px 0px 10px',
        margin: '20px auto 0px',
        boxShadow: '0px -5px 15px #d9d9d9',
        background: '#fff',
        borderRadius: '5px 5px 0 0',
      }}>
        <Flex gap="small" wrap justify="flex-end" align="center">
          <div style={{ margin: '0 20px' }}>
            <h3 style={{ marginRight: '10px', fontWeight: 'bold' }}>ยอดรวม: <span style={{ color: '#ff4d00' }}>฿{totalQty}</span></h3>
          </div>
        </Flex>
        <Flex gap="small" wrap justify="flex-end" align="center">
          <div style={{ margin: '10px 30px 0 0' }}>
            <Button color="danger" variant="outlined" className='primary-btn'>
              Buy Now
            </Button>
          </div>
        </Flex>
      </Footer>
    </Content>
  );
}