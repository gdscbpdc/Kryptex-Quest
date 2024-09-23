import { Open_Sans } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import './globals.css';
import theme from '@/lib/theme';
import Header from '@/components/Header';
import { AuthProvider } from '@/components/AuthProvider';
import Image from 'next/image';

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open_sans',
});

export const metadata = {
  title: 'Kryptex Quest',
  description: 'A GDG Event',
  openGraph: {
    title: 'Kryptex Quest',
    description: 'A GDG Event',
    url: 'https://nishitbatwal.com',
    siteName: 'Your Website',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kryptex Quest',
    description: 'A GDG Event',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon-32x32.png',
    apple: '/icons/apple-icon.png',
  },
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
                <Image
                  src='/logo.png'
                  alt='GDG Logo'
                  width={1000}
                  height={484}
                  priority
                  loading='eager'
                  className='absolute grid place-items-center opacity-40 h-auto md:h-[60svh] w-[90svw] md:w-auto -z-10 blur-md'
                  draggable={false}
                />

                {children}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
