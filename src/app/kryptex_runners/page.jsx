'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/components/AuthProvider';
import CustomDialog from '@/components/CustomDialog';
import Title from '@/components/kryptex_runners/Title';
import Kryptex from '@/components/kryptex_runners/Kryptex';

const KryptexRunners = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const runnerRef = useRef(null);
  const obstacleRef = useRef(null);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [runnerPosition, setRunnerPosition] = useState({ left: 50, bottom: 0 });
  const [obstacleActive, setObstacleActive] = useState(false);
  const [obstacleKey, setObstacleKey] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      console.log('User is not logged');
      router.replace('/register');
    }
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.code === 'Space' || event.code === 'ArrowUp') &&
        !isJumping &&
        !gameOver
      ) {
        jump();
      }
    };

    const handleTouchStart = () => {
      if (!isJumping && !gameOver) {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart);

    const gameLoop = setInterval(updateGame, 10);
    const scoreInterval = setInterval(() => {
      if (!gameOver) {
        setScore((s) => s + 1);
      }
    }, 100);

    const obstacleTimer = setTimeout(() => {
      setObstacleActive(true);
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      clearInterval(gameLoop);
      clearInterval(scoreInterval);
      clearTimeout(obstacleTimer);
    };
  }, [isJumping, gameOver]);

  const jump = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  const updateGame = () => {
    const runner = runnerRef.current?.getBoundingClientRect();
    const obstacle = obstacleRef.current?.getBoundingClientRect();

    if (!runner || !obstacle) return;

    if (
      runner.bottom > obstacle.top &&
      runner.top < obstacle.bottom &&
      runner.right > obstacle.left &&
      runner.left < obstacle.right
    ) {
      setGameOver(true);
    }

    if (score >= 100 && !won) {
      setWon(true);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setWon(false);
    setGameOver(false);
    setIsJumping(false);
    setRunnerPosition({ left: 50, bottom: 0 });
    setObstacleActive(false);
    setObstacleKey((prevKey) => prevKey + 1);

    setTimeout(() => {
      setObstacleActive(true);
    }, 15000);
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-5 md:space-y-10'>
      <Title />

      <div className='game flex flex-col items-center justify-center relative overflow-hidden h-[300px] w-svw md:w-[90svw] max-w-[1200px] border-black border-2'>
        <div className='aboslute top-3 left-3 text-lg md:text-xl'>
          Score: {score}
        </div>

        <Kryptex
          runnerRef={runnerRef}
          isJumping={isJumping}
          runnerPosition={runnerPosition}
        />

        {obstacleActive && (
          <div
            key={obstacleKey}
            ref={obstacleRef}
            className={`obstacle w-[25px] h-[40px] text-white absolute bottom-0 -right-[20px] ${
              gameOver ? 'paused' : ''
            }`}
          >
            <p className='rotate-90'></p>
          </div>
        )}

        <CustomDialog
          open={won}
          title=' You have won the game! Great Job!'
          content='Here is the hint: GO TO BHUKKAD'
          actionTitle='Continue'
          onClick={() => {}}
        />

        <CustomDialog
          open={!won && gameOver}
          title='Nice Try!'
          content={`Your score: ${score}!`}
          actionTitle='Try Again'
          onClick={resetGame}
        />
      </div>
    </div>
  );
};

export default KryptexRunners;
