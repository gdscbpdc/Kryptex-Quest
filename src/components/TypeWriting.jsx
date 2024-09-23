'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const TypeWriting = ({ text, onClick }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center space-y-5 md:space-y-10'>
      <TypeAnimation
        sequence={[text, () => setShowButton(true)]}
        speed={100}
        className='code text-xl md:text-3xl text-center text-balance font-bold'
        style={{ whiteSpace: 'pre-line' }}
      />

      {showButton && onClick && (
        <Button
          color='primary'
          className='mt-5'
          variant='contained'
          size='large'
          onClick={onClick}
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default TypeWriting;
