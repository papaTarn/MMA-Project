// Import Component
import NavbarPage from '@/components/pages/home/Navbar';

// Import Style
import '@/components/global.css';
import { notoSansThai } from '@/components/fonts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${notoSansThai.variable} ${notoSansThai.variable}`}>
      <body style={{ marginBottom: '20px' }} suppressHydrationWarning={true}>
        <NavbarPage />
        <div>{children}</div>
      </body>
    </html>
  );
}
