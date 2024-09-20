'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../components/AuthProvider';

const Home = () => {
  const router = useRouter();
  const { currentUser, getStep } = useAuth();

  useEffect(() => {
    if (currentUser) {
      console.log('User is logged in');
      getStep();
    } else {
      console.log('User is not logged');
      router.replace('/register');
    }
  }, [currentUser]);

  return;
};

export default Home;
