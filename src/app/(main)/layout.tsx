import '@/app/globals.css';
import { ModeContext } from '@/components/providers/mode-context';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: "Periodic Tools",
  description: "주기율표 기반 원소 정보와 wt%, at% 단위 변환 도구를 제공하는 Periodic Tools. 화합물 조합을 쉽게 도와주는 과학 계산 도구입니다.",
  openGraph: {
    title: "Periodic Tools",
    description: "원소 정보 확인부터 wt% ↔ at% 단위 변환까지. Periodic Tools로 화합물 조합을 쉽고 정확하게!",
    url: "https://periodic-tools.c1ock.com",
    siteName: "Periodic Tools",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Periodic Tools 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};
type LaoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({children}: LaoutProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body>
        <ModeContext initialMode="TABLE">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ModeContext>
      </body>
      {isProduction && <GoogleAnalytics gaId="G-8VF3JCEQEC" />}
    </html>
  );
}
