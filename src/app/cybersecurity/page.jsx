'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import Container from '@/components/Container';
import { Cybersecurity } from '@/lib/questions';
import CustomDialog from '@/components/CustomDialog';
import { updateProgress } from '@/services/helperFunctions';

const CybersecurityPage = () => {
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleSubmit = async () => {
    if (answer.trim().toLowerCase().length === 0) {
      return alert('Please enter your answer!');
    }

    if (answer.trim().toLowerCase() === Cybersecurity.answer) {
      setStage(2);

      await updateProgress('/cybersecurity');
    } else {
      setWrongAnswer(true);
    }
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

      <Button className='w-full' variant='contained' onClick={handleSubmit}>
        Submit
      </Button>

      <CustomDialog
        open={wrongAnswer}
        title='Wrong Answer'
        actionTitle='Try Again'
        content='Please try again!'
        onClick={() => setWrongAnswer(false)}
      />
    </Container>
  );
};

export default CybersecurityPage;
