import Image from 'next/image';
import { Open_Sans } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import './globals.css';
import theme from '@/lib/theme';
import Header from '@/components/Header';
import { AuthProvider } from '@/components/AuthProvider';
import TypeWriting from '@/components/TypeWriting';

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
    url: 'https://kryptex-quest.vercel.app/',
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
      <body
        className={`${open_sans.variable} antialiased min-h-dvh flex flex-col items-center justify-center`}
      >
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />

              <Image
                src='/logo.png'
                alt='GDG Logo'
                width={1000}
                height={484}
                priority
                loading='eager'
                className='absolute opacity-40 h-auto md:h-[60dvh] w-[90dvw] md:w-auto -z-10 blur-md'
                draggable={false}
              />

              <Header />

              <main className='w-dvw h-full grid place-items-center mt-[80px] md:mt-0'>
                {children}

                {/* <TypeWriting
                  text={[
                    'Event Completed',
                    'Thank you for attending Kryptex Quest',
                  ]}
                /> */}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
