import { useEffect } from 'react';

const TouchHandler = ({ onJump }) => {
  useEffect(() => {
    const handleTouchStart = (event) => {
      event.preventDefault();
      onJump();
    };

    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onJump]);

  return null;
};

export default TouchHandler;
