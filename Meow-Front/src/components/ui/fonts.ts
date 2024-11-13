import { Noto_Sans_Thai } from 'next/font/google';

export const notoSansThai = Noto_Sans_Thai({
  weight: ['400', '600'],
  subsets: ['thai'],
  display: 'swap',
  preload: true,
});