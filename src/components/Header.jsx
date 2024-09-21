'use client';

import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

import Progress from './Progress';
import { useAuth } from './AuthProvider';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentUser, logout } = useAuth();

  return (
    <div className='z-50 w-full top-0 fixed p-5 flex flex-col items-center gap-5 md:gap-10'>
      <div className='flex flex-row items-center justify-between w-full'>
        <h1 className='text-lg md:text-3xl font-bold'>Treasure Hunt</h1>

        <Button
          variant='contained'
          color='primary'
          onClick={
            currentUser
              ? logout
              : () =>
                  router.push(pathname === '/login' ? '/register' : '/login')
          }
        >
          {currentUser
            ? 'Logout'
            : pathname === '/login'
            ? 'Register'
            : 'Login'}
        </Button>
      </div>

      {/* {(pathname !== '/login' || pathname !== '/register') && <Progress />} */}
    </div>
  );
};

export default Header;
