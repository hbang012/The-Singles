import { Montserrat, Lusitana } from 'next/font/google';
import localFont from 'next/font/local';

//  변수형 폰트는 weight 지정안함
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

// 항상 소문자로
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// 본문에서 사용하는건 레이아웃에서 연결
export const pretendard = localFont({
  src: [
    { path: '../../public/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/fonts/Pretendard-Bold.woff', weight: '700' },
  ],
  display: 'swap',
});
