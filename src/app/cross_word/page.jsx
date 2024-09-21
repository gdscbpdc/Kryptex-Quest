'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { CrossWord } from '@/lib/questions';
import { useAuth } from '@/components/AuthProvider';
import CustomDialog from '@/components/CustomDialog';
import CrosswordSquare from '@/components/cross_word/CrosswordSquare';

const CrossWord = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const crosswordData = [
    [0, 0, 1, 0],
    [1, 1, 1, { persist: 'A' }],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];

  const [puzzle, setPuzzle] = useState(crosswordData);
  const [showHint, setShowHint] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      console.log('User is not logged');
      router.replace('/register');
    }
  }, [currentUser]);

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

  const checkAnswer = () => {
    const answer = puzzleToString();

    if (answer === CrossWord.answer) {
      setShowHint(true);
    } else {
      setShowFailed(true);
      setPuzzle(crosswordData);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-5 md:space-y-10 max-w-md'>
      <h1 className='text-2xl font-bold text-center'>{CrossWord.question}</h1>

      <table>
        <tbody>
          {puzzle.map((rowData, i) => (
            <tr key={i}>
              {rowData.map((cellData, j) => (
                <td className='w-16 h-16' key={j}>
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

      <CustomDialog
        open={showHint}
        title='You got it right!'
        content={`Here is the hint: ${CrossWord.hint}`}
        onClick={() => {}}
        actionTitle='Continue'
      />
    </div>
  );
};

export default CrossWord;
