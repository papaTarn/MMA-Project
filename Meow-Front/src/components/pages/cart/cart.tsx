'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Flex, Spin, Button, Input, Select, InputNumber, Typography, Empty, Table, Divider, TableColumnsType, Popconfirm, Image, Tooltip } from 'antd';
import { DeleteOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import { deleteCart, getCartByUserId, getFavoriteListByUserId, setFavourite } from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';
import { styleText } from 'util';
import Link from 'next/link';

const { Content } = Layout;
const { Title } = Typography;

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [cartResult, setCartResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState<boolean>(true);

  // const router = useRouter();
  // const { id } = router.query;

  // ราคาเริ่มต้นของสินค้า (ตั้งค่าไว้ที่ 1,000 บาทเป็นตัวอย่าง)

  // สร้าง State สำหรับเก็บจำนวนสินค้าและคำนวณราคารวม
  const [quantity, setQuantity] = useState<number>(1); // จำนวนเริ่มต้นเป็น 1

  // ฟังก์ชันจัดการการเปลี่ยนแปลงจำนวนสินค้า
  const handleQuantityChange = (value: number, price: number) => {
    setQuantity(value);
  };
  const urlImg = 'http://localhost:3001/images/';

  const searchCart = async () => {
    try {
      const data = await getCartByUserId(); // เรียกใช้ฟังก์ชันที่แยกไว้
      setCartResult(data);
      setLoading(false);
    } catch (err: any) {
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
  }, []);

  useEffect(() => {
    if (cartResult?.isSuccess) {
      setCart(cartResult.result);
    } else {
      setCart([]);
    }
  }, [cartResult]);

  const handleQtyChange = (id: number, newQty: number) => {
    setCart((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, qty: newQty } : product
      )
    );
  };

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
            {record.prodDetail.length > 80
              ? `${record.prodDetail.substring(0, 80)}...`
              : record.prodDetail}
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

  return loading ? (
    <Content className="container">
      <Spin tip="Loading..." spinning={loading} />
    </Content>
  ) : (
    <Content className="container">
      <Table dataSource={cart} columns={columns} pagination={false} rowHoverable={false} rowKey="id" />
    </Content>
  );
}