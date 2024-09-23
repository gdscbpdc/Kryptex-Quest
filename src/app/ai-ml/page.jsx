'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import { AI_ML } from '@/lib/questions';
import Container from '@/components/Container';
import sentenceSimilarity from '@/lib/similarity';
import { updateProgress } from '@/services/helperFunctions';

const AIMLPage = () => {
  const [stage, setStage] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);

  const checkSimilarity = async () => {
    const score = sentenceSimilarity(userInput, AI_ML.answer) * 100;

    setSimilarityScore(score);

    if (score > 75) {
      setStage(2);

      await updateProgress('/ai-ml');
    }
  };

  return (
    <Container
      title={AI_ML.title}
      question={AI_ML.question}
      stage={stage}
      setStage={setStage}
    >
      <TextField
        type='text'
        value={userInput}
        className='w-full'
        label='Enter your answer'
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button className='w-full' variant='contained' onClick={checkSimilarity}>
        Check Answer
      </Button>

      {similarityScore !== null && (
        <h2 className='text-center text-base md:text-lg'>
          Cosine Similarity Score: {similarityScore.toFixed(2)}%
          <br />
          You need more than 75% to pass.
        </h2>
      )}
    </Container>
  );
};

export default AIMLPage;
