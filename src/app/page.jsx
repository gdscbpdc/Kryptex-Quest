'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import Dashboard from '@/components/Dashboard';
import TypeWriting from '@/components/TypeWriting';
import { getAndUpdateTeam } from '@/services/helperFunctions';

const HomePage = () => {
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAndUpdateTeam().then((team) => {
      setTeam(team);

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
      {team ? (
        <Dashboard team={team} />
      ) : (
        <div className='flex flex-col items-center gap-5'>
          <TypeWriting
            text={[
              'Welcome to Kryptex Quest',
              'Login or Register to start the game',
            ]}
          />

          <div className='flex flex-row gap-5'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push('/login')}
            >
              Login
            </Button>

            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push('/register')}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
