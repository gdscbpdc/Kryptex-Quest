'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Loading from './Loading';
import { order } from '@/lib/order';
import TypeWriting from './TypeWriting';
import { messages } from '@/lib/messages';
import { getAndUpdateTeam, getDecryptedItem } from '@/services/helperFunctions';

const Container = ({
  children,
  title,
  question,
  className,
  stage,
  setStage,
  setScore,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const team = getDecryptedItem('team');

    if (!team) {
      router.replace('/login');
      return;
    }

    getAndUpdateTeam().then((team) => {
      // router.replace(order[team.currentStep]);

      if (order[team.currentStep] !== pathname) {
        if (team.completedSteps?.includes(pathname)) {
          setStage(2);
        } else {
          router.replace('/');
        }
      }

      setLoading(false);
    });
  }, []);

  const questionStage = [
    <TypeWriting
      text={messages[pathname].before}
      onClick={() => {
        setStage(stage + 1);
        if (setScore) setScore(0);
      }}
    />,
    <div
      className={`${className} flex flex-col items-center justify-center space-y-5 md:space-y-10`}
    >
      {/* <Progress /> */}

      <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
        {title}
      </h1>

      <p className='text-base md:text-2xl font-bold text-center text-balance max-w-7xl'>
        {question}
      </p>

      <div className='w-full space-y-2 md:space-y-5'>{children}</div>
    </div>,
    <TypeWriting text={messages[pathname].after} />,
  ];

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
        {questionStage[stage]}
      </div>
    );
  }
};

export default Container;
