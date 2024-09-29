'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import Container from '@/components/Container';
import { BioInfomatics } from '@/lib/questions';
import { submitAnswer } from '@/lib/submitAnswer';
import AlertSnackbar from '@/components/AlertSnackbar';
import { updateProgress } from '@/services/helperFunctions';

const BioInformaticsPage = () => {
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!answer.trim()) {
      setError('Enter an answer!');
      return;
    }

    const result = await submitAnswer(answer, '/bio-infomatics');

    if (result === true) {
      setStage(2);
      await updateProgress('/bio-infomatics');
    } else setError(result.error);
  };

  return (
    <Container
      question={BioInfomatics.question}
      stage={stage}
      setStage={setStage}
      className='max-w-lg'
    >
      <TextField
        type='text'
        value={answer}
        fullWidth
        label='Enter your answer'
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button
        size='large'
        className='w-full'
        variant='contained'
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <AlertSnackbar error={error} setError={setError} />
    </Container>
  );
};

export default BioInformaticsPage;
