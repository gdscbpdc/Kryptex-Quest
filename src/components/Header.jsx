'use client';

import Link from 'next/link';
import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';

import TypeWriting from './TypeWriting';
import { isLoggedIn, logout } from '@/services/helperFunctions';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='z-50 w-full top-0 fixed p-5 flex flex-col items-center gap-5 md:gap-10 backdrop-blur-lg bg-transparent'>
      <div className='flex flex-row items-center justify-between w-full'>
        <Link href='/'>
          <TypeWriting text={'Kryptex Quest'} />
        </Link>

        {isLoggedIn() ? (
          pathname === '/' ? (
            <Button
              size='large'
              variant='outlined'
              color='primary'
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Link href='/'>
              <Button size='large' variant='outlined' color='primary'>
                Dashboard
              </Button>
            </Link>
          )
        ) : pathname === '/login' ? (
          <Link href='/register'>
            <Button size='large' variant='outlined' color='primary'>
              Register
            </Button>
          </Link>
        ) : (
          pathname === '/register' && (
            <Link href='/login'>
              <Button size='large' variant='outlined' color='primary'>
                Login
              </Button>
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
