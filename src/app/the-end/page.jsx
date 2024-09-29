'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  endTimer,
  getAndUpdateTeam,
  getElapsedTime,
} from '@/services/helperFunctions';
import { order } from '@/lib/order';
import { messages } from '@/lib/messages';
import Loading from '@/components/Loading';
import TypeWriting from '@/components/TypeWriting';

const TheEnd = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    getAndUpdateTeam().then((team) => {
      if (!team) {
        router.replace('/login');
        return;
      }

      console.log(team.currentStep);
      console.log(order.findIndex((o) => o === pathname));

      if (team.currentStep < order.findIndex((o) => o === pathname)) {
        router.replace('/');
        return;
      }

      if (!team.elapsedTime) {
        endTimer();
        setElapsedTime(getElapsedTime());
      } else {
        setElapsedTime(team.elapsedTime);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container w-full h-full flex flex-col items-center justify-center px-5 md:px-0 space-y-5 md:space-y-10'>
        <TypeWriting text={messages.final + `\n\nYour Time: ${elapsedTime}`} />
        <p className='code text-lg md:text-2xl text-center text-balance'></p>
      </div>
    );
  }
};

export default TheEnd;
