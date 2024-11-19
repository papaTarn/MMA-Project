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
      render: (text: string) => <Image src={`${urlImg}${text}`} alt="Product Image" width={100} height={100} style={{ objectFit: 'cover', borderRadius: '5px' }} />,
    },
    {
      title: '',
      dataIndex: 'prodDetail',
      key: 'prodDetail',
      width: 300,
      render: (_: string, record: ProductItem) => (
        <div>
          <h4>{`ID: ${record.id} ${record.prodName}`}</h4>
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
      render: (value: number) => `฿${value.toFixed(2)}`,
    },
    {
      title: 'จำนวน',
      dataIndex: 'qty',
      key: 'qty',
      width: 100,
      align: 'right' as 'right',
      render: (value: number, record: ProductItem) => (
        <InputNumber
          min={1}
          max={99}
          value={value}
          onChange={(newQty) => {
            if (newQty) {
              const newData = cart.map((item) =>
                item.id === record.id
                  ? { ...item, qty: newQty }
                  : item
              );
              setCart(newData);
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
    <Spin size="large" />
  ) : (
    <Content className="container">
      <Table dataSource={cart} columns={columns} pagination={false} rowHoverable={false} />
      {/* <Row gutter={[16, 16]} style={{ padding: 16 }}>
        {cart.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.prodName}
                  src={`${urlImg}${product.prodImg}`}
                  style={{ maxHeight: 200, objectFit: 'cover' }}
                />
              }
            >
              <h3>{product.prodName}</h3>
              <p>{product.prodDetail}</p>
              <p><strong>ราคาต่อชิ้น:</strong> ฿{product.prodPrice.toFixed(2)}</p>
              <InputNumber
                min={1}
                value={product.qty}
                onChange={(value) => handleQtyChange(product.id, value || 1)}
                style={{ marginBottom: 8 }}
              />
              <p><strong>ราคารวม:</strong> ฿{(product.prodPrice * product.qty).toFixed(2)}</p>
              <Button type="primary" danger onClick={() => handleDelete(product.id)}>
                ลบ
              </Button>
            </Card>
          </Col>
        ))}
      </Row> */}
    </Content>
  );

  // return (
  //   <React.Fragment>
  //     {cart.length == 0 ? (
  //       <Flex justify="center" align="center" style={{ height: '60vh' }}>
  //         <Empty description={'Data not Found !'} />
  //       </Flex>
  //     ) : (
  //       <Content className="container">
  //         <Table<ProductItem> columns={columns} dataSource={data} size="small" />
  //         {/* {cart.map(data => (            
  //           <Flex gap="middle" align="start" vertical>
  //             <Card style={{ width: '100%', marginTop: 16 }} bodyStyle={{ padding: 7 }} key={data.id}>
  //               <Row gutter={[16, 16]} style={{ padding: 0 }}>
  //                 <Col span={3}>
  //                   <img
  //                     alt={data.prodImg}
  //                     src={`${urlImg}${data.prodImg}`}
  //                     style={{ objectFit: 'cover', borderRadius: '5px' }}
  //                     width={100}
  //                     height={100}
  //                   />
  //                 </Col>

  //                 <Col span={20}>
  //                   <Flex gap="large" align="start" vertical>
  //                     <div style={{ display: 'flex' }}>
  //                       <span>{data.recommendFlag ? <FlagRecommend /> : ''}</span>
  //                       <span style={{ fontWeight: 'bold', paddingLeft: 10 }}>{`ID:${data.id} ${data.prodName}`}</span>
  //                     </div>
  //                     <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#ff4d00' }}>ราคา: ฿{data.prodPrice}</span>
  //                     <InputNumber
  //                       min={1}
  //                       value={quantity}
  //                       formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  //                       onChange={value => handleQuantityChange(value || 1, data.prodPrice)} // ถ้า value เป็น null จะตั้งค่าเป็น 1
  //                     />
  //                     <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#ff4d00' }}>ราคารวม: ฿{`${quantity * data.prodPrice}`}</span>
  //                   </Flex>
  //                 </Col>
  //                 <Col span={1}>
  //                   <div
  //                     style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
  //                     <span onClick={() => deleteProduct(data.id)}>
  //                       <DeleteOutlined style={{ color: '#F44336', fontSize: '1.2rem', cursor: 'pointer' }} />
  //                     </span>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Card>
  //           </Flex>
  //         ))} */}
  //       </Content>
  //     )}
  //   </React.Fragment>
  // );
}