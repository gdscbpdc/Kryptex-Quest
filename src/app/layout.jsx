import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Open_Sans } from 'next/font/google';

import { AuthProvider } from '../components/AuthProvider';
import Header from '../components/Header';
import theme from '../lib/theme';
import './globals.css';

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${open_sans.variable} antialiased`}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />
              <Header />

              <main className='h-svh w-svw grid place-items-center'>
                <div className='container grid place-items-center px-10 md:px-0'>
                  {children}
                </div>
              </main>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
