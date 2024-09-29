'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Loading from './Loading';
import { order } from '@/lib/order';
import TypeWriting from './TypeWriting';
import { messages } from '@/lib/messages';
import { getAndUpdateTeam } from '@/services/helperFunctions';

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
    // setStage(1);
    // setLoading(false);
    // return;

    getAndUpdateTeam().then((team) => {
      if (!team) {
        router.replace('/login');
        return;
      }

      if (team.currentStep < order.findIndex((o) => o === pathname)) {
        router.replace('/');
        return;
      }

      if (team.completedSteps?.includes(pathname)) {
        setStage(2);
      }
      setLoading(false);
    });
  }, []);

  const questionStage = [
    <TypeWriting
      text={messages[pathname].before}
      buttonText='Continue'
      onClick={() => {
        setStage(stage + 1);
        if (setScore) setScore(0);
      }}
    />,
    <div className='flex flex-col items-center justify-center space-y-5 md:space-y-10'>
      <h1 className='text-2xl md:text-3xl font-bold text-center text-balance'>
        {title}
      </h1>

      <p
        className={`text-lg md:text-xl font-bold text-center text-balance max-w-7xl ${
          pathname === '/ai-ml' ? 'italic' : ''
        }`}
      >
        {question}
      </p>

      <div
        className={`${className} flex flex-col items-center justify-center w-full space-y-5`}
      >
        {children}
      </div>
    </div>,
    <TypeWriting
      text={messages[pathname].after}
      buttonText='Scan Next'
      onClick={() => {
        router.push('/scanner');
      }}
    />,
  ];

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        className={`container w-full h-full -mt-[80px] md:mt-0 flex flex-col items-center justify-center ${
          pathname === '/kryptex-runners' && stage === 1 ? 'px-0' : 'px-5'
        } md:px-0`}
      >
        {questionStage[stage]}
      </div>
    );
  }
};

export default Container;
