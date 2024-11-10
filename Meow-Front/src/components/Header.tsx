'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Layout, MenuProps, Menu, Modal } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import useMenuStore from '@/store/useMenuStore';
import Image from 'next/image';

const { Header } = Layout;
import Login from '../components/pages/form/login';

function HeaderComponent() {
  const pageTitle = useMenuStore(state => state.current?.title);

  //testlogin
  const [islogin, setIslogin] = useState<boolean>(false);

  type MenuItem = Required<MenuProps>['items'][number];

  useEffect(() => {
    document.title = pageTitle ?? 'Meow-Meow';
  }, [pageTitle]);

  const dropdownItems: MenuProps['items'] = [
    {
      label: 'Name Account',
      key: 'account',
    },
    {
      type: 'divider',
    },
    {
      label: 'บัญชี',
      key: 'edit account ',
      extra: '>',
    },
    {
      label: 'การสั่งซื้อล่าสุด',
      key: 'lasted order',
      extra: '>',
    },
    {
      label: 'ที่อยู่ที่บันทึกไว้',
      key: 'adress',
      extra: '>',
    },
    {
      label: 'ออกจากระบบ',
      key: 'sign out',
      extra: '>',
    },
  ];

  const itemsnavbar: MenuItem[] = [
    {
      key: 'Home',
      label: (
        <div className="item-center">
          <HomeOutlined className="style-icon" />
          <span className="menu-navbar">Home</span>
        </div>
      ),
    },
    {
      key: 'Cart',
      label: (
        <div className="item-center">
          <ShoppingCartOutlined className="style-icon" />
          <span className="menu-navbar">Cart</span>
        </div>
      ),
    },
    {
      key: 'Favorite',
      label: (
        <div className="item-center">
          <HeartOutlined className="style-icon" />
          <span className="menu-navbar"> Favorite</span>
        </div>
      ),
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = e => console.log('click', e);
  const dropdownMenuProps = {
    items: dropdownItems,
    onClick: handleMenuClick,
  };

  return (
    <Layout>
      <Header className="header">
        <div>
          <Image
            src="http://localhost:3001/images/Logo.png"
            alt="main logo"
            layout="responsive"
            width={200}
            height={200}
            className="w-auto h-auto "
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Menu className="menu" mode="horizontal" items={itemsnavbar} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!islogin && (
            <div>
              <Login />
            </div>
          )}
          {islogin && (
            <Dropdown menu={dropdownMenuProps} trigger={['click']} className="h-7" overlayStyle={{ width: '300px' }}>
              <Avatar size={50} icon={<UserOutlined />} style={{ marginLeft: 'auto' }}></Avatar>
            </Dropdown>
          )}
        </div>
      </Header>
    </Layout>
  );
}

export default HeaderComponent;
