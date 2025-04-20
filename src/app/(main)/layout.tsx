import '@/app/globals.css';
import { ModeContext } from '@/components/providers/mode-context';
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
        <ModeContext initialMode="TABLE">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ModeContext>
      </body>
    </html>
  );
}
