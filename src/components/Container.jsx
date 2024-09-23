'use client';

import { usePathname } from 'next/navigation';

import TypeWriting from './TypeWriting';
import { messages } from '@/lib/messages';

const Container = ({
  children,
  title,
  question,
  className,
  stage,
  setStage,
}) => {
  const pathname = usePathname();

  const questionStage = [
    <TypeWriting
      text={messages[pathname].before}
      onClick={() => setStage(stage + 1)}
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

  return (
    <div className='container w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
      {questionStage[stage]}
    </div>
  );
};

export default Container;
