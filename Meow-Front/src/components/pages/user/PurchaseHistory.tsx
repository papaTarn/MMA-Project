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
  Pagination,
} from 'antd';
import { DeleteOutlined, FileSearchOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Import Service
import {
  addCart,
  deleteCart,
  getCartByUserId,
  getFavoriteListByUserId,
  orderHistoryAll,
  orderHistoryById,
  setFavourite,
  updateCart,
} from '@/services/productService';

// import Interface
import { ProductResponse, ProductItem, OrderItem, ListOrderResponse } from '@/models/productModel';
import type { PaginationProps } from 'antd';

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

export default function PurchaseHistoryPage(porps: CartProp) {
  const router = useRouter();
  const urlImg = 'http://localhost:3001/images/';

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [orderResult, setOrderResult] = useState<ListOrderResponse>();
  const [totalQty, setTotalQty] = useState<string>();
  const [current, setCurrent] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQTY, setTotalQTY] = useState(0);
  // const masterData = useState<Master[]>(porps.msgList.result);

  const [loading, setLoading] = useState<boolean>(true);
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page);
    searchOrderAll(page);
  };

  const searchOrderAll = async (currentPage: number) => {
    try {
      setLoading(true);
      const listData = {
        "startDate": "2024-12-03",
        "endDate": "2024-12-09",
        "page": currentPage,
        "pageSize": 10
      }

      const data = await orderHistoryAll(listData); // เรียกใช้ฟังก์ชันที่แยกไว้
      setOrderResult(data);
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

  const searchOrderDetail = async (userId: number, orderId: number) => {
    try {
      setLoading(true);
      const listData = {
        "userId": userId,
        "orderId": orderId,
      }
      const data = await orderHistoryById(listData); // เรียกใช้ฟังก์ชันที่แยกไว้
      console.log(data)
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

  useEffect(() => {
    searchOrderAll(1);
  }, []);

  useEffect(() => {
    if (orderResult?.isSuccess) {
      if (orderResult.result.list) {
        setOrder(orderResult.result.list);
        setTotalRecord(orderResult.result.totalRecord);
        setTotalPrice(orderResult.result.totalPrice);
        setTotalQTY(orderResult.result.totalQTY);
      }
    }
  }, [orderResult]);

  const columns: ColumnsType<OrderItem> = [
    {
      title: 'วันที่สั่งซื้อ',
      dataIndex: 'orderDate',
      key: 'orderDate',
      align: 'center' as 'center',
      width: 100,
      render: (text: string, record: OrderItem) => (
        <div style={{ textAlign: 'left' }}>
          {new Date(record.orderDate).toLocaleString('th-TH')}
        </div>
      ),
    },
    {
      title: 'ชื่อลูกค้า',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      align: 'center' as 'center',
      render: (_: string, record: OrderItem) => (
        <div style={{ textAlign: 'left' }}>
          {record.fullName}
        </div>
      ),
    },
    {
      title: 'ที่อยู่จัดส่ง',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      align: 'center' as 'center',
      render: (_: string, record: OrderItem) => (
        <div style={{ textAlign: 'left' }}>
          {record.address}
        </div>
      ),
    },
    {
      title: 'ยอดรวม',
      dataIndex: 'total',
      key: 'total',
      align: 'center' as 'center',
      width: 100,
      render: (value: number, record: OrderItem) => (
        <div style={{ textAlign: 'right' }}>
          ฿{(record.sumPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      ),
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'action',
      key: 'action',
      align: 'center' as 'center',
      width: 100,
      render: (_: any, record: OrderItem) => (
        <Button shape="circle" danger icon={<FileSearchOutlined />} onClick={() => searchOrderDetail(record.userId, record.orderId)} />
      ),
    },
  ];

  return (
    <Content>
      <Spin tip="Loading..." spinning={loading}>
        <Flex wrap gap="small">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>รายงานสรุปออเดอร์</h3>
              <Flex vertical align="flex-end" justify="flex-start">
                <Row style={{ marginTop: '1.25rem' }}>
                  <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>
                      <strong>จำนวนสินค้ารวม : {`${totalQTY.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} รายการ</strong>
                    </h4>
                    <h3 className="gap-2">
                      <strong>มูลค่า </strong>
                      <strong>฿{`${totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</strong>
                    </h3>
                  </Col>
                </Row>
              </Flex>
              <br />
              <Table
                dataSource={order}
                columns={columns}
                pagination={false}
                rowHoverable={false}
                rowKey="id"
                style={{ marginBottom: 50 }}
              />
              <Flex vertical align="flex-end" justify="flex-start" style={{ padding: 32 }}>
                <Pagination current={current} onChange={onChange} defaultPageSize={10} total={totalRecord} />
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Spin>
    </Content>
  );
}
