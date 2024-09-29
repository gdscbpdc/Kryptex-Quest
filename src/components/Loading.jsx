import Image from 'next/image';

const Loading = () => {
  return (
    <div className='absolute grid place-items-center h-svh w-svw'>
      <Image
        src={'/assets/kryptex.jpg'}
        width={1000}
        height={1000}
        alt='Logo'
        className='h-20 md:h-32 w-auto'
        priority
      />
    </div>
  );
};

export default Loading;
