import Progress from './Progress';

const Header = () => {
  return (
    <div className='z-50 w-full top-0 fixed px-2 py-5 transition-all duration-100 flex flex-col items-center gap-5 md:gap-10'>
      <h1 className='text-lg md:text-xl font-bold'>TREASURE HUNT</h1>

      <Progress />
    </div>
  );
};

export default Header;
