import '@/app/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Head from 'next/head';
export const metadata = {
  title: 'Periodic Tools',
  description: 'Handle the elements with ease',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
