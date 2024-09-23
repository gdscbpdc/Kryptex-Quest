'use client';

import { useState } from 'react';
import { Button } from '@mui/material';

import { CrossWord } from '@/lib/questions';
import Container from '@/components/Container';
import CustomDialog from '@/components/CustomDialog';
import CrosswordSquare from '@/components/cross_word/CrosswordSquare';

const CrossWordPage = () => {
  const [stage, setStage] = useState(0);
  const [puzzle, setPuzzle] = useState(CrossWord.question);
  const [showFailed, setShowFailed] = useState(false);

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

  const checkAnswer = async () => {
    const answer = puzzleToString();

    if (answer !== CrossWord.answer) {
      setStage(2);
    } else {
      setShowFailed(true);
      setPuzzle(CrossWord.question);
    }
  };

  return (
    <Container stage={stage} setStage={setStage}>
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

      <Button onClick={checkAnswer} variant='contained' className='w-full'>
        Submit
      </Button>

      <CustomDialog
        open={showFailed}
        title='Incorrect'
        content='Please try again'
        onClick={() => setShowFailed(false)}
        actionTitle='Try Again'
      />
    </Container>
  );
};

export default CrossWordPage;
