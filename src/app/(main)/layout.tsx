import '@/app/globals.css';
import { ModeContext } from '@/components/providers/mode-context';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'Periodic Tools',
  description: 'Handle the elements with ease',
  icons: {
    icon: '/favicon.svg',
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
