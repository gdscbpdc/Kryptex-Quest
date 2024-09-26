'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const TypeWriting = ({ text, onClick }) => {
  const [showButton, setShowButton] = useState(false);

  const content = typeof text === 'string' ? text : [...text].join('\n');

  return (
    <div className='flex flex-col items-center justify-center space-y-5 md:space-y-10'>
      <TypeAnimation
        speed={50}
        style={{ whiteSpace: 'pre-line' }}
        sequence={[content, () => setShowButton(true)]}
        className='code text-xl md:text-3xl text-center text-balance font-bold'
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
