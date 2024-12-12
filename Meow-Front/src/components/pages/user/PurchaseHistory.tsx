'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Layout, Card, Col, Row, Flex, Spin, Button, Input, Select, InputNumber, Typography, Empty, Table, Divider, TableColumnsType,
  Popconfirm, Image, Tooltip, Checkbox, Pagination, DatePicker
} from 'antd';
import { DeleteOutlined, FileSearchOutlined, HeartFilled, HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

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
import ModalPurchaseComponent from './ModalPurchase';

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [userId, setUserId] = useState<number>();
  const [orderId, setOrderId] = useState<number>();
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const dateFormat = 'DD/MM/YYYY';
  const dateFormatSearch = 'YYYY-MM-DD';
  const defaultPageSize = 10;
  // const masterData = useState<Master[]>(porps.msgList.result);

  const [loading, setLoading] = useState<boolean>(true);
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page ?? 1);
    searchOrderAll(page ?? 1, true);
  };

  const searchOrderAll = async (currentPage: number, mode: boolean) => {
    try {
      setLoading(true);
      setCurrent(currentPage ?? 1);
      const listData = {
        "startDate": !mode ? dateRange?.[0] ?? '' : '',
        "endDate": !mode ? dateRange?.[1] ?? '' : '',
        "page": currentPage,
        "pageSize": defaultPageSize
      }
      console.log(listData)
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
      setUserId(userId);
      setOrderId(orderId);
      setIsModalOpen(true)
    } catch (err: any) {
    }
  };

  const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      setDateRange(dateStrings as [string, string]);
    } else {
      setDateRange(null);
    }
  };

  const disabledDate = (current: dayjs.Dayjs | null): boolean => {
    // Disable dates not within the range of 3 months before today until today
    if (!current) return false; // กรณีที่ current เป็น null
    const startDate = dayjs().subtract(3, 'month').startOf('day');
    const endDate = dayjs().endOf('day');
    return current.isBefore(startDate) || current.isAfter(endDate);
    // return current && current.isAfter(dayjs().endOf('day')); // เฉพาะวันที่อนาคต
  };

  useEffect(() => {
    searchOrderAll(1, false);
  }, []);

  useEffect(() => {
    if (orderResult?.isSuccess) {
      if (orderResult.result.list) {
        setOrder(orderResult.result.list);
        setTotalRecord(orderResult.result.totalRecord);
        setTotalPrice(orderResult.result.totalPrice);
        setTotalQTY(orderResult.result.totalQTY);
      }
    } else {
      setOrder([]);
    }
  }, [orderResult]);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // ใช้เวลาแบบ 24 ชั่วโมง
    });
  };

  const columns: ColumnsType<OrderItem> = [
    {
      title: 'วันที่สั่งซื้อ',
      dataIndex: 'orderDate',
      key: 'orderDate',
      align: 'center' as 'center',
      width: 150,
      render: (text: string, record: OrderItem) => (
        <div style={{ textAlign: 'left' }}>
          {formatDate(record.orderDate)}
        </div>
      ),
    },
    {
      title: 'ชื่อลูกค้า',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 300,
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
      align: 'center' as 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (_: string, record: OrderItem) => (
        <div style={{ textAlign: 'left', textWrap: 'pretty' }}>
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
        <Content className="container-page">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h3 style={{ background: '#ffeee0', padding: '0.438rem 0.85rem' }}>รายงานสรุปออเดอร์</h3>
              <Flex vertical align="flex-end" justify="center" style={{ marginBottom: 10 }}>
                <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                  <Col>ช่วงวันที่</Col>
                  <Col>
                    <RangePicker
                      format="DD/MM/YYYY"
                      onChange={handleDateChange}
                      disabledDate={disabledDate}
                    />
                  </Col>
                  <Col>
                    <Button onClick={() => searchOrderAll(1, false)}><SearchOutlined /></Button>
                  </Col>
                </Row>
                <Col span={24}>
                  <Flex align="flex-end" justify="flex-start">
                    <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                      <Col>
                        <h4 style={{ marginLeft: 25, marginTop: 5, fontWeight: 'normal' }}>
                          จำนวนสินค้ารวม : {`${totalRecord.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} รายการ
                        </h4>
                      </Col>
                      <Col>
                        <h3 style={{ marginTop: 5 }}>
                          <strong>มูลค่า </strong>
                          <strong>฿{`${totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</strong>
                        </h3>
                      </Col>
                    </Row>
                  </Flex>
                </Col>
              </Flex>
              <Table
                dataSource={order}
                columns={columns}
                pagination={false}
                rowHoverable={false}
                rowKey="id"
              />
              <Flex vertical align="flex-end" justify="flex-start" style={{ padding: '32px 0px 32px' }}>
                <Pagination current={current} onChange={onChange} defaultPageSize={defaultPageSize} total={totalRecord} showSizeChanger={false} />
              </Flex>
              <ModalPurchaseComponent isOpen={isModalOpen} onClose={closeModal} userId={userId} orderId={orderId} />
            </Col>
          </Row>
        </Content>
      </Spin>
    </Content>
  );
}
