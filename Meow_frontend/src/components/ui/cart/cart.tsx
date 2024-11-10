'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Typography, Button, InputNumber, Card } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function Cart() {
  // const router = useRouter();
  // const { id } = router.query;

  // ราคาเริ่มต้นของสินค้า (ตั้งค่าไว้ที่ 1,000 บาทเป็นตัวอย่าง)
  const pricePerUnit = 1000;

  // สร้าง State สำหรับเก็บจำนวนสินค้าและคำนวณราคารวม
  const [quantity, setQuantity] = useState<number>(1); // จำนวนเริ่มต้นเป็น 1
  const totalPrice = quantity * pricePerUnit;

  // ฟังก์ชันจัดการการเปลี่ยนแปลงจำนวนสินค้า
  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <React.Fragment>
      <Content className="container" style={{ marginBottom: '20px', padding: '20px' }}>
        <Card style={{ maxWidth: "600px", margin: "auto" }}>
          <Title level={2}>Product ID: </Title>
          <p>รายละเอียดสินค้าชิ้นนี้...</p>
          <Title level={4}>ราคาต่อชิ้น: ฿{pricePerUnit.toLocaleString()}</Title>

          {/* ส่วนการเพิ่ม/ลดจำนวนสินค้า */}
          <div style={{ margin: "20px 0" }}>
            <span style={{ marginRight: "10px" }}>จำนวน:</span>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => handleQuantityChange(value || 1)} // ถ้า value เป็น null จะตั้งค่าเป็น 1
            />
          </div>

          {/* แสดงราคารวม */}
          <Title level={4}>ราคารวม: ฿{totalPrice.toLocaleString()}</Title>

          {/* ปุ่มเพิ่มสินค้าลงตะกร้า */}
          <Button type="primary" style={{ marginTop: "10px" }}>
            เพิ่มลงตะกร้า
          </Button>
        </Card>
      </Content>

    </React.Fragment>
  );
}