'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Col, Row, Flex, Spin, Button, Input, Select, InputNumber, Typography, Empty, Table, Divider, TableColumnsType } from 'antd';
import { DeleteOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import { getCartByUserId, getFavoriteListByUserId, setFavourite } from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem } from '@/models/productModel';

// import Hook
import useNotification from '@/hooks/useNotification';
import useModal from '@/hooks/useModal';
import FlagRecommend from '@/components/ui/FlagRecommend';

const { Content } = Layout;
const { Title } = Typography;

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [cartResult, setCartResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState(true);

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

  const deleteProduct = async (id: number) => {

  }

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

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];


  return (
    <React.Fragment>
      {cart.length == 0 ? (
        <Flex justify="center" align="center" style={{ height: '60vh' }}>
          <Empty description={'Data not Found !'} />
        </Flex>
      ) : (
        <Content className="container">
          {cart.map(data => (
            <Table<DataType> columns={columns} size="small" />
            // <Flex gap="middle" align="start" vertical>
            //   <Card style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
            //     <Row gutter={[16, 16]} style={{ padding: 0 }}>
            //       <Col span={3}>
            //         <img
            //           alt={data.prodImg}
            //           src={`${urlImg}${data.prodImg}`}
            //           style={{ objectFit: 'cover', borderRadius: '5px' }}
            //           width={100}
            //           height={100}
            //         />
            //       </Col>

            //       <Col span={20}>
            //         <Flex gap="large" align="start" vertical>
            //           <div style={{ display: 'flex' }}>
            //             <span>{data.recommendFlag ? <FlagRecommend /> : ''}</span>
            //             <span style={{ fontWeight: 'bold', paddingLeft: 10 }}>{`ID:${data.id} ${data.prodName}`}</span>
            //           </div>
            //           <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#ff4d00' }}>ราคา: ฿{data.prodPrice}</span>
            //           <InputNumber
            //             min={1}
            //             value={quantity}
            //             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            //             onChange={value => handleQuantityChange(value || 1, data.prodPrice)} // ถ้า value เป็น null จะตั้งค่าเป็น 1
            //           />
            //           <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#ff4d00' }}>ราคารวม: ฿{`${quantity * data.prodPrice}`}</span>
            //         </Flex>
            //       </Col>
            //       <Col span={1}>
            //         <div
            //           style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
            //           <span onClick={() => deleteProduct(data.id)}>
            //             <DeleteOutlined style={{ color: '#F44336', fontSize: '1.2rem', cursor: 'pointer' }} />
            //           </span>
            //         </div>
            //       </Col>
            //     </Row>
            //   </Card>
            // </Flex>
          ))}
        </Content>
      )}
    </React.Fragment>
  );
}
