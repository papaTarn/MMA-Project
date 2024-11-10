'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Badge, message } from "antd";
import { HomeOutlined, BellOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "@/components/ui/LoginModal";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);

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
    setIsLoggedIn(false);
    message.info("Logged out successfully!");
  };

  // เมนู Dropdown สำหรับผู้ใช้ที่ล็อกอินแล้ว
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">ประวัติผู้ใช้งาน</Link>
      </Menu.Item>
      <Menu.Item key="address">
        <Link href="/address">ที่อยู่</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "linear-gradient(90deg, #FF7E29, #FF9900)", padding: "0 20px", display: "flex", alignItems: "center" }}>
      {/* Logo */}
      <div style={{ marginRight: "auto" }}>
        <Image src="http://localhost:3001/images/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Menu */}
      <Menu mode="horizontal" theme="dark" style={{ background: "transparent", borderBottom: "none", flexGrow: 1, justifyContent: "center" }}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={cartItemCount} overflowCount={99} offset={[10, 0]}>
            <ShoppingCartOutlined style={{ fontSize: "18px" }} />
          </Badge>
          <Link href="/cart">Cart</Link>
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
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#87d068", cursor: "pointer" }} onClick={showLoginModal} />
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

export default Navbar;