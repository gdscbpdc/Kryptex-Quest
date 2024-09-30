'use client';

import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Progress from './Progress';
import { getElapsedTime, getStartTime } from '@/services/helperFunctions';

const Dashboard = ({ team }) => {
  const router = useRouter();
  const startTime = getStartTime();
  const [elapsedTime, setElapsedTime] = useState(0);

  if (startTime) {
    useEffect(() => {
      const interval = setInterval(() => {
        const elapsedTimeFromDB = getElapsedTime();

        setElapsedTime(elapsedTimeFromDB);
      }, 1000);

      return () => clearInterval(interval);
    }, []);
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5 md:gap-10 h-full w-full'>
      <div className='absolute bottom-5 right-5 p-2 rounded-lg bg-background'>
        <IconButton
          onClick={() => {
            router.push('/scanner');
          }}
          size='medium'
        >
          <QrCodeScannerIcon fontSize='large' color='primary' />
        </IconButton>
      </div>

      <h1 className='text-3xl md:text-5xl font-bold text-center text-balance code'>
        {team.teamName}
      </h1>

      {team.currentStep === -1 && (
        <div className='flex flex-col items-center justify-center gap-5'>
          <h1 className='code text-xl md:text-2xl font-bold text-center text-balance'>
            Welcome to the Kryptex Quest!
          </h1>
          <p className='text-base md:text-xl font-bold text-center text-balance'>
            Scan the first QR code to begin the quest from bottom right corner
            <br />
            Complete each challenge to progress through the game
            <br />
            The clues will guide you to the next location where you will find
            the next QR code
            <br />
            Keep an eye on the timer to track your progress, it will determine
            your rank
            <br />
            Timer will start once you scan the first QR code
            <br />
            You can navigate to challenges and find the scanner from the
            dashboard
          </p>
        </div>
      )}

      {team.currentStep !== -1 && <Progress team={team} />}

      {startTime && (
        <div className='absolute bottom-5 left-5'>
          <h1 className='code text-2xl md:text-4xl font-bold text-center text-balance'>
            {elapsedTime}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
