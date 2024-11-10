'use client';

import React, { useState } from 'react';
import Header from './Header';
import useLayout from '@/hooks/useLayout';
import RootConfig from './RootConfig';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <RootConfig>
      <div className="flex h-full">
        {useLayout().hide ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <React.Fragment>
            <div className={'w-[calc(100vw_-_0px)]'}>
              <Header />
              <div className={`h-[calc(100vh_-_0px)] overflow-auto`}>
                <div >{children}</div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </RootConfig>
  );
}

export default Layout;
