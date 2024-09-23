'use client';

import Link from 'next/link';
import { Button } from '@mui/material';

import { isLoggedIn, logout } from '@/services/helperFunctions';

const Header = () => {
  return (
    <div className='z-50 w-full top-0 fixed p-5 flex flex-col items-center gap-5 md:gap-10'>
      <div className='flex flex-row items-center justify-between w-full'>
        <Link href='/'>
          <h1 className='text-lg md:text-3xl font-bold code'>Kryptex Quest</h1>
        </Link>

        {isLoggedIn() && (
          <Button variant='contained' color='primary' onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
