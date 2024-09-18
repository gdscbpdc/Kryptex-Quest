import Image from 'next/image';

const Kryptex = ({ runnerRef, isJumping, runnerPosition }) => {
  return (
    <div
      ref={runnerRef}
      className={`w-[50px] h-[50px] absolute bottom-0 left-[50px] ${
        isJumping ? 'jump' : ''
      }`}
      style={{
        left: `${runnerPosition.left}px`,
        bottom: `${runnerPosition.bottom}px`,
        transition: 'none',
      }}
    >
      <Image
        width={640}
        height={640}
        alt='Kryptex_Buffed'
        src='/assets/kryptex.jpg'
        className='w-[50px] h-[50px] transform -scale-x-100'
      />
    </div>
  );
};

export default Kryptex;
