'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import Container from '@/components/Container';
import { Cybersecurity } from '@/lib/questions';
import { submitAnswer } from '@/lib/submitAnswer';
import AlertSnackbar from '@/components/AlertSnackbar';
import { updateProgress } from '@/services/helperFunctions';

const CybersecurityPage = () => {
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!answer.trim()) {
      setError('Enter an answer!');
      return;
    }

    const result = await submitAnswer(answer, '/cybersecurity');

    if (answer.trim().toLowerCase().length === 0) {
      return alert('Please enter your answer!');
    }

    if (result === true) {
      setStage(2);
      await updateProgress('/cybersecurity');
    } else setError(result.error);
  };

  return (
    <Container
      question={Cybersecurity.question}
      stage={stage}
      setStage={setStage}
    >
      <TextField
        type='text'
        value={answer}
        className='w-full'
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

      <p className='text-center max-w-lg text-base md:text-lg font-semibold'>
        In these files, I found documents that date back to World War II. The
        ciphers used lead to the solution of this too. Can you crack it?
      </p>

      <AlertSnackbar error={error} setError={setError} />
    </Container>
  );
};

export default CybersecurityPage;
