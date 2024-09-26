'use client';

import Loading from '@/components/Loading';
import {
  getAndUpdateTeam,
  scanAndUpdateProgress,
} from '@/services/helperFunctions';
import * as QRScanner from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';

const Scanner = () => {
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
    <div className='flex flex-col items-center justify-center gap-5 md:gap-10 w-full'>
      <QRScanner.Scanner
        allowMultiple={true}
        scanDelay={1000}
        styles={{
          container: {
            border: 'none',
          },
          finderBorder: 10,
        }}
        onScan={scanAndUpdateProgress}
        onError={console.error}
      />
    </div>
  );
};

export default Scanner;
