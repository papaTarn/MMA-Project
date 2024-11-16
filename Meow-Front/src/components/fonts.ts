import { Inter, Roboto_Mono, Noto_Sans_Thai } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});