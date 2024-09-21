'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const QRGamePage = () => {
  const imageDataChunks = [1, 2, 3, 4, 5, 6, 7, 8];
  const [chunkStates, setChunkStates] = useState(imageDataChunks);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const swapChunks = (sourceI, destI) => {
    let newChunkStates = [...chunkStates];
    [newChunkStates[sourceI], newChunkStates[destI]] = [
      newChunkStates[destI],
      newChunkStates[sourceI],
    ];
    setChunkStates(newChunkStates);
  };

  const onClickHandle = (index) => {
    if (selectedIndex.length === 0) {
      setSelectedIndex([index]);
    } else if (selectedIndex.length === 1) {
      if (selectedIndex[0] !== index) {
        swapChunks(selectedIndex[0], index);
      }
      setSelectedIndex([]);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <h1 className='text-3xl font-bold mb-8'>QR Code Puzzle</h1>
      <div className=' inline-grid grid-cols-4 gap-0'>
        {chunkStates.map((imgId, index) => (
          <div
            key={index}
            onClick={() => onClickHandle(index)}
            className='cursor-pointer'
          >
            <Image
              src={`/assets/qr-game/chunk-${imgId}.jpg`}
              alt={`Chunk ${imgId}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRGamePage;
