import { LayoutContext } from '@/context/LayoutContext';
import { ConfigProvider, App, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../shared/config/i18n.config';
import { themeConfig } from '@/styles/config/theme.config';

function RootConfig({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(false);
  const screenState = useMemo(() => ({ loading, setLoading }), []);
  return (
    <ConfigProvider theme={themeConfig}>
      <I18nextProvider i18n={i18n}>
        <App>
          <LayoutContext.Provider value={screenState}>
            <Spin spinning={loading} size="large">
              {children}
            </Spin>
          </LayoutContext.Provider>
        </App>
      </I18nextProvider>
    </ConfigProvider>
  );
}

export default RootConfig;
