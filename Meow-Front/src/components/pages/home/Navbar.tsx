'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Badge, message, Divider } from "antd";
import { HomeOutlined, BellOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "@/components/ui/LoginModal";
import { checkLogin } from "@/services/profileService";
import { getCountCartByUserId } from "@/services/productService";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function NavbarPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [username, setUserName] = useState<string>('');
  const [adminMode, setAdminMode] = useState(false);
  const router = useRouter();

  // เปิด Modal เมื่อต้องการล็อกอิน
  const showLoginModal = () => {
    setIsModalVisible(true);
  };

  // ปิด Modal เมื่อยกเลิกการล็อกอิน
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ฟังก์ชันที่จะเรียกเมื่อ login สำเร็จ
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalVisible(false);
  };

  // ฟังก์ชันการล็อกเอาต์
  const handleLogout = () => {
    localStorage.removeItem('_token')
    setIsLoggedIn(false);
    setAdminMode(false);
    setCartItemCount(0);
    countCartByUserId();
    router.push('/');
  };

  const checklogin = async () => {
    try {
      const data = await checkLogin();
      if (data.isSuccess) {
        setIsLoggedIn(true);
        setIsModalVisible(false);
        countCartByUserId();
        if (data.result[0].email === 'admin@gmail.com') {
          setAdminMode(true)
        } else {
          setAdminMode(false)
        }
        if (data.result[0].fname && data.result[0].lname) {
          setUserName(`${data.result[0].fname} ${data.result[0].lname}`);
        } else {
          setUserName(data.result[0].email);
        }
      } else {
        setIsLoggedIn(false);
        setAdminMode(false)
        handleLogout();
      }
    } catch (err: any) {

    }
  }

  const countCartByUserId = async () => {
    try {
      const data = await getCountCartByUserId();
      if (data.isSuccess) {
        setCartItemCount(data.result[0].count)
      } else {
        setCartItemCount(0);
      }
    } catch (err: any) {

    }
  }

  // เมนู Dropdown สำหรับผู้ใช้ที่ล็อกอินแล้ว
  const userMenu = (
    <Menu>
      <Menu.Item key="username" style={{ cursor: 'context-menu' }}>
        {username.length > 40 ? `${username.substring(0, 40)}...` : username}
      </Menu.Item>
      <Divider style={{ margin: 0 }}></Divider>
      <Menu.Item key="profile">
        <Link href="/user/profile">บัญชี</Link>
      </Menu.Item>
      <Menu.Item key="purchase">
        <Link href="/user/orderHistory">การสั่งซื้อล่าสุด</Link>
      </Menu.Item>
      <Menu.Item key="address">
        <Link href="/user/address">ที่อยู่ที่บันทึกไว้</Link>
      </Menu.Item>
      {adminMode ? (
        <>
          <Divider style={{ margin: 0 }}></Divider>
          <Menu.Item key="orderHistory">
            <Link href="/user/purchaseHistory">รายงานสรุปออเดอร์</Link>
          </Menu.Item>
          <Menu.Item key="maintainProduct">
            <Link href="/user/maintainProduct">Maintain Product</Link>
          </Menu.Item>
          <Divider style={{ margin: 0 }}></Divider>
        </>
      ) : (
        <Divider style={{ margin: 0 }}></Divider>
      )}

      <Menu.Item key="logout" onClick={handleLogout}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    checklogin()
  }, [isLoggedIn]);

  return (
    <Header style={{ background: "linear-gradient(90deg, #FF7E29, #FF9900)", padding: "0 20px", display: "flex", alignItems: "center" }}>
      {/* Logo */}
      <div style={{ marginRight: "auto" }}>
        <Image src="http://localhost:3001/images/Logo.png" alt="Logo" width={100} height={100} style={{ objectFit: 'cover', verticalAlign: 'middle' }} />
      </div>

      {/* Menu */}
      <Menu mode="horizontal" theme="dark" style={{ background: "transparent", borderBottom: "none", flexGrow: 1, justifyContent: "center" }}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="cart">
          {cartItemCount != 0 ? (
            <Badge count={cartItemCount} overflowCount={99} offset={[10, 0]}>
              <ShoppingCartOutlined style={{ fontSize: "18px" }} />
            </Badge>
          ) : (
            <ShoppingCartOutlined style={{ fontSize: "18px" }} />
          )}
          <Link href="/cart" onClick={() => countCartByUserId()}> Cart</Link>
        </Menu.Item>
        <Menu.Item key="favorite" icon={<HeartOutlined />}>
          <Link href="/favorite">Favorite</Link>
        </Menu.Item>
      </Menu>

      {/* Profile Icon */}
      {isLoggedIn ? (
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#87d068", cursor: "pointer" }} />
        </Dropdown>
      ) : (
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#FFC107", cursor: "pointer" }} onClick={showLoginModal} />
      )}

      {/* นำ LoginModal มาใช้ */}
      <LoginModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onLoginSuccess={handleLoginSuccess}
      />
    </Header>
  );
};
