'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import { AI_ML } from '@/lib/questions';
import sentenceSimilarity from '@/lib/similarity';
import CustomDialog from '@/components/CustomDialog';

const AIMLPage = () => {
  const [userInput, setUserInput] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);

  const checkSimilarity = () => {
    const score = sentenceSimilarity(userInput, AI_ML.answer) * 100;
    setSimilarityScore(score);
    setHintVisible(score > 75);
  };

  return (
    <div className='flex flex-col items-center space-y-5 md:space-y-10 max-w-md mt-40'>
      <h1 className='text-xl md:text-3xl font-bold text-center '>
        {AI_ML.question}
      </h1>

      <TextField
        type='text'
        value={userInput}
        className='w-full'
        label='Enter your answer'
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button className='w-full' variant='contained' onClick={checkSimilarity}>
        Check Similarity
      </Button>

      {similarityScore !== null && (
        <div className='text-center'>
          <h2 className='text-lg'>
            Cosine Similarity Score: {similarityScore.toFixed(2)}%
          </h2>
        </div>
      )}

      <CustomDialog
        title='Hint'
        open={hintVisible}
        actionTitle='Close'
        content={AI_ML.hint}
        onClick={() => setHintVisible(false)}
      />
    </div>
  );
};

export default AIMLPage;
