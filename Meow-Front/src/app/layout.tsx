'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import { Layout } from 'antd';

import Navbar from '@/components/ui/main/Navbar';

import { notoSansThai } from '@/components/ui/fonts';
import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={notoSansThai.className}>
        <Navbar />
        <section style={{ marginBottom: '20px' }}>{children}</section>
      </body>
    </html>
  );
}
