import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from '@/app/componets/fonts';
import TanStackProvider from '@/providers/TanStackProvider';
import ThemeProvider from '@/app/componets/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: '당당한 싱글들을 위한 라이프스타일 매거진, 싱글즈',
    template: '%s | 네이버',
  },
  description: '당신의 일상에 재미를 더하는 싱글들의 라이프 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ThemeProvider>
        <body className={pretendard.className}>
          <TanStackProvider>{children}</TanStackProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
