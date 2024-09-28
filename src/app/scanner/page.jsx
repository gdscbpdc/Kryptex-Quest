'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';
import { Scanner as QRScanner } from '@yudiel/react-qr-scanner';

import {
  getAndUpdateTeam,
  scanAndUpdateProgress,
} from '@/services/helperFunctions';
import { order } from '@/lib/order';
import Loading from '@/components/Loading';

const Scanner = () => {
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAndUpdateTeam().then((team) => {
      setTeam(team);

      setLoading(false);
    });
  }, []);

  const onScan = async (data) => {
    try {
      const result = await scanAndUpdateProgress(data);

      router.push(order[result]);
    } catch (error) {
      setError(error);
      setOpen(true);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container w-full h-full flex flex-col items-center justify-center gap-5 md:gap-10 px-5 md:px-0'>
        <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
          Scan QR Code to Proceed to Next Stage of the Game
        </h1>

        <div className='w-full md:w-auto h-auto md:h-[50svh]'>
          <QRScanner
            styles={{
              container: {
                border: 'none',
              },
              finderBorder: 10,
            }}
            scanDelay={3000}
            allowMultiple={true}
            onError={console.error}
            onScan={onScan}
          />
        </div>

        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
            {error.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default Scanner;
