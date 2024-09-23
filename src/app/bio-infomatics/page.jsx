'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import Container from '@/components/Container';
import { BioInfomatics } from '@/lib/questions';
import CustomDialog from '@/components/CustomDialog';

const BioInformaticsPage = () => {
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleSubmit = async () => {
    if (answer.trim().length === 0) {
      return alert('Please enter your answer!');
    }

    if (answer.trim().toLowerCase() === BioInfomatics.answer) {
      setStage(2);
    } else {
      setWrongAnswer(true);
    }
  };

  return (
    <Container
      question={BioInfomatics.question}
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

export default BioInformaticsPage;
