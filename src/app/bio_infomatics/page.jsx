'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import { BioInfomatics } from '@/lib/questions';
import CustomDialog from '@/components/CustomDialog';

const Home = () => {
  const [answer, setAnswer] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase().length === 0) {
      return alert('Please enter your answer!');
    }

    if (answer.trim().toLowerCase() === BioInfomatics.correctAnswer) {
      setHintVisible(true);
    } else {
      setHintVisible(false);
      setWrongAnswer(true);
    }
  };

  return (
    <div className='flex flex-col items-center space-y-5 md:space-y-10 max-w-md'>
      <h1 className='text-xl md:text-3xl font-bold text-center'>
        {BioInfomatics.question}
      </h1>

      <TextField
        type='text'
        value={answer}
        className='w-full'
        label='Enter your answer'
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button className='w-full' variant='contained' onClick={handleSubmit}>
        Submit
      </Button>

      <CustomDialog
        title='Hint'
        open={hintVisible}
        actionTitle='Close'
        content={BioInfomatics.hint}
        onClick={() => {}}
      />

      <CustomDialog
        open={wrongAnswer}
        title='Wrong Answer'
        actionTitle='Try Again'
        content='Please try again!'
        onClick={() => setWrongAnswer(false)}
      />
    </div>
  );
};

export default Home;
