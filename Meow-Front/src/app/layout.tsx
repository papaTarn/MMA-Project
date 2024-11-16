// Import Component
import NavbarPage from '@/components/pages/home/navbar';

// Import Style
import '@/components/global.css';
import { notoSansThai } from '@/components/fonts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${notoSansThai.variable} ${notoSansThai.variable}`}>
      <body style={{ marginBottom: '20px' }}>
        <NavbarPage />
        <div>{children}</div>
      </body>
    </html>
  );
}
