import Favorite from '@/components/pages/favorite/Favorite';
import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export default function Page() {
  return (
    <React.Fragment>
      <Favorite />;
    </React.Fragment>
  );
}
