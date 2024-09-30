'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { order } from '@/lib/order';
import Loading from '@/components/Loading';
import { getAndUpdateTeam } from '@/services/helperFunctions';

const QRGamePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const imageDataChunks = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chunkStates, setChunkStates] = useState(
    imageDataChunks.sort(() => Math.random() - 0.5)
  );

  const swapChunks = (source, dest) => {
    let newChunkStates = [...chunkStates];
    [newChunkStates[source], newChunkStates[dest]] = [
      newChunkStates[dest],
      newChunkStates[source],
    ];
    setChunkStates(newChunkStates);
  };

  const onClickHandle = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      if (selectedIndex !== index) {
        swapChunks(selectedIndex, index);
      }
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    getAndUpdateTeam().then((team) => {
      if (!team) {
        router.replace('/login');
        return;
      }

      if (team.currentStep < order.findIndex((o) => o === pathname)) {
        router.replace('/');
        return;
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container w-full h-full flex flex-col items-center justify-center px-5 md:px-0 space-y-5 md:space-y-10'>
        <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
          Rearrange the chunks to form the final QR code
        </h1>

        <p className='text-lg md:text-xl font-bold text-center text-balance'>
          Use the website scanner to scan the final QR code
        </p>

        <div className='inline-grid grid-cols-3 gap-0 p-5 bg-white'>
          {chunkStates.map((imgId, index) => (
            <div
              key={index}
              onClick={() => onClickHandle(index)}
              className='cursor-pointer'
            >
              <Image
                draggable={false}
                src={`/assets/qr-game/chunk-${imgId}.png`}
                alt={`Chunk ${imgId}`}
                width={200}
                priority
                loading='eager'
                height={200}
                className={
                  selectedIndex === index
                    ? 'border-4 border-blue-500'
                    : 'border-0 border-none'
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default QRGamePage;
