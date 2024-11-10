"use client";

import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import CustomContent from '../Content/content';
import Link from 'next/link'

const { Sider } = Layout;

function ProductByCategory() {
  const [selectedCategory, setSelectedCategory] = useState('1');
  
  const itemsCategory = [
    {
      key: 'grp',
      label: 'Category',
      children: [
        {
          key: '1',
          label: 'Food & Medicine',
        },
        {
          key: '2',
          label: 'Home & Items',
        },
        {
          key: '3',
          label: 'Cleaning Product',
        },
        {
          key: '4',
          label: 'Other',
        },
      ],
    },
  ];

  return (
    <>
    <CustomContent categoryId={selectedCategory} />
    </>
  );
}

export default ProductByCategory;
