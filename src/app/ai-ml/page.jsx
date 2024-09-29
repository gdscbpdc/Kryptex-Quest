'use client';

import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { AI_ML } from '@/lib/questions';
import Container from '@/components/Container';
import { submitAIMLAnswer } from '@/lib/submitAnswer';
import AlertSnackbar from '@/components/AlertSnackbar';
import { updateProgress } from '@/services/helperFunctions';

const AIMLPage = () => {
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState('');
  const [similarityScore, setSimilarityScore] = useState(0);

  useEffect(() => {
    const checkSimilarity = async () => {
      const result = await submitAIMLAnswer(answer);

      if (result.score) setSimilarityScore(result.score);
    };

    answer.trim() && checkSimilarity();
  }, [answer]);

  const handleSubmit = async () => {
    setError('');

    console.log(answer.trim().split(' ').length);

    if (!answer.trim()) {
      setError('Enter an answer');
      return;
    }

    if (answer.trim().split(' ').length > 25) {
      setError('Answer should be max 25 words');
      return;
    }

    const result = await submitAIMLAnswer(answer);

    if (result.score) setSimilarityScore(result.score);

    if (result.correct) {
      setStage(2);
      await updateProgress('/ai-ml');
    }

    if (result.error) setError(result.error);
  };

  return (
    <Container
      title={AI_ML.title}
      question={AI_ML.question}
      stage={stage}
      setStage={setStage}
      className='max-w-lg'
    >
      <TextField
        multiline
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

      <h2 className='text-center text-base md:text-lg font-semibold'>
        Cosine Similarity Score: {similarityScore.toFixed(2)}%
        <br />
        Max 25 words. You need more than 70% to pass.
      </h2>

      <AlertSnackbar error={error} setError={setError} />
    </Container>
  );
};

export default AIMLPage;
