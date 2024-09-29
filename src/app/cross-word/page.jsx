'use client';

import { useState } from 'react';
import { Button } from '@mui/material';

import { CrossWord } from '@/lib/questions';
import Container from '@/components/Container';
import { submitAnswer } from '@/lib/submitAnswer';
import AlertSnackbar from '@/components/AlertSnackbar';
import { updateProgress } from '@/services/helperFunctions';
import CrosswordSquare from '@/components/cross_word/CrosswordSquare';

const CrossWordPage = () => {
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');
  const [puzzle, setPuzzle] = useState(CrossWord.question);

  const updatePuzzleSquare = (i, j, event) => {
    const { value } = event.target;
    if (/^[A-Z]?$/.test(value.toUpperCase())) {
      const newPuzzle = [...puzzle];
      newPuzzle[i][j] = value.toUpperCase();
      setPuzzle(newPuzzle);
    }
  };

  const puzzleToString = () => {
    let pString = '';
    puzzle.forEach((row) => {
      row.forEach((e) => {
        if (typeof e === 'string' || typeof e === 'number') {
          pString += e;
        } else {
          pString += e.persist;
        }
      });
    });
    return pString;
  };

  const handleSubmit = async () => {
    setError('');

    const answer = puzzleToString();

    const result = await submitAnswer(answer, '/cross-word');

    if (result === true) {
      setStage(2);
      await updateProgress('/cross-word');
    } else setError(result.error);
  };

  return (
    <Container stage={stage} setStage={setStage} title={CrossWord.title}>
      <table>
        <tbody>
          {puzzle.map((rowData, i) => (
            <tr key={i}>
              {rowData.map((cellData, j) => (
                <td className='w-8 md:w-16 h-8 md:h-16' key={j}>
                  <CrosswordSquare
                    key={`${i} ${j}`}
                    cell={cellData}
                    i={i}
                    j={j}
                    puzzle={puzzle}
                    updateSquare={updatePuzzleSquare}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        size='large'
        onClick={handleSubmit}
        variant='contained'
        className='w-full'
      >
        Submit
      </Button>

      <p className='text-center text-base md:text-lg font-semibold'>
        Can't figure it out? Head back to the stall.
      </p>

      <AlertSnackbar error={error} setError={setError} />
    </Container>
  );
};

export default CrossWordPage;
