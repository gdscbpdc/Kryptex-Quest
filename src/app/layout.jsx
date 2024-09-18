import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import './globals.css';
import theme from '@/lib/theme';
import Header from '@/components/Header';

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open_sans',
});

export const metadata = {
  title: 'Treasure Hunt',
  description: 'A GDG Event',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>
          <body className={`${open_sans.variable} antialiased`}>
            <Header />

            <div className='flex flex-col items-center justify-center h-svh px-10 md:px-0'>
              <div className='container'>{children}</div>
            </div>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
