'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Layout,
  Card,
  Col,
  Row,
  Flex,
  Spin,
  Button,
  Input,
  Select,
  InputNumber,
  Typography,
  Empty,
  Table,
  Divider,
  TableColumnsType,
  Popconfirm,
  Image,
  Tooltip,
  Checkbox,
} from 'antd';
import { DeleteOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import {
  addCart,
  deleteCart,
  getCartByUserId,
  getFavoriteListByUserId,
  setFavourite,
  updateCart,
} from '@/services/productService';

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
import { MasterResponse } from '@/models/masterModel';
import type { CheckboxProps, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Content } = Layout;
const { Title } = Typography;

interface CartProp {
  msgList: MasterResponse;
}

export default function MaintainProductPage(porps: CartProp) {
  const router = useRouter();
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [cartResult, setCartResult] = useState<ProductResponse>();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState<boolean>(true);
  const urlImg = 'http://localhost:3001/images/';
  const [totalQty, setTotalQty] = useState<string>();
  // const masterData = useState<Master[]>(porps.msgList.result);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const searchOrderAll = async () => {
    try {
      // const data = await orderHistoryById(); // เรียกใช้ฟังก์ชันที่แยกไว้
      // setCartResult(data);
      setLoading(false);
    } catch (err: any) {
      if (err.status == 403) {
        // const msg = masterData[0]?.find(x => x.code == 'W0004');
        // modalError({
        //   title: err?.message,
        //   content: msg?.value,
        //   onOk: () => {
        //     if (err.status == 403) {
        //       router.push('/');
        //     }
        //   },
        // });
      } else {
        modalError({
          title: err?.message,
          content: err?.description,
          onOk: () => { },
        });
      }
    }
  }
  const searchOrderDetail = async () => {
    try {
      // const data = await orderHistoryById(); // เรียกใช้ฟังก์ชันที่แยกไว้
      // setCartResult(data);
      setLoading(false);
    } catch (err: any) {
      if (err.status == 403) {
        // const msg = masterData[0]?.find(x => x.code == 'W0004');
        // modalError({
        //   title: err?.message,
        //   content: msg?.value,
        //   onOk: () => {
        //     if (err.status == 403) {
        //       router.push('/');
        //     }
        //   },
        // });
      } else {
        modalError({
          title: err?.message,
          content: err?.description,
          onOk: () => { },
        });
      }
    }
  };

  const handleDetail = async (id: number) => {

  }

  useEffect(() => {
    searchOrderAll();
  }, []);

  useEffect(() => {
    if (cartResult?.isSuccess) {
      setCart(cartResult.result);
    } else {
      setCart([]);
    }
  }, [cartResult]);

  const columns: ColumnsType<ProductItem> = [
    {
      title: 'วันที่สั่งซื้อ',
      dataIndex: 'orderDate',
      key: 'orderDate',
      align: 'center' as 'center',
      width: 100,
      render: (text: string, record: ProductItem) => (
        <Link href={`/products/${record.prodId}`}>
          <img
            src={`${urlImg}${text}`}
            alt="Product Image"
            width={100}
            height={100}
            style={{ objectFit: 'cover', borderRadius: '5px' }}
          />
        </Link>
      ),
    },
    {
      title: 'ชื่อลูกค้า',
      dataIndex: 'prodName',
      key: 'prodName',
      width: 150,
      align: 'center' as 'center',
      render: (_: string, record: ProductItem) => (
        <div>
          <h4>{`(ID: ${record.prodId}) (Cart ID: ${record.id}) ${record.prodName}`}</h4>
          <p>{record.prodDetail.length > 80 ? `${record.prodDetail.substring(0, 80)}...` : record.prodDetail}</p>
        </div>
      ),
    },
    {
      title: 'ที่อยู่จัดส่ง',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      align: 'center' as 'center',
      render: (value: number) => (
        <div style={{ textAlign: 'right' }}>฿{value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
      ),
    },
    {
      title: 'ยอดรวม',
      dataIndex: 'total',
      key: 'total',
      align: 'right' as 'right',
      width: 100,
      render: (value: number, record: ProductItem) => (
        <div style={{ textAlign: 'right' }}>
          ฿{(record.prodPrice * record.qty).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      ),
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'action',
      key: 'action',
      align: 'center' as 'center',
      width: 100,
      render: (_: any, record: ProductItem) => (
        <Popconfirm title="คุณต้องการลบสินค้านี้หรือไม่?" onConfirm={() => handleDetail(record.id)}>
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Content>
      <Spin tip="Loading..." spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>Maintain Product</h3>
            <br />
            <Table
              dataSource={cart}
              columns={columns}
              pagination={false}
              rowHoverable={false}
              rowKey="id"
              style={{ marginBottom: 50 }}
            />
          </Col>
        </Row>
      </Spin>
    </Content>
  );
}
