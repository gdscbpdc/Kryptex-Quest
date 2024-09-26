import { IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Progress from './Progress';
import { useRouter } from 'next/navigation';

const Dashboard = ({ team }) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center gap-5 md:gap-10 w-full'>
      <div className='absolute bottom-5 right-5 p-2 rounded-lg bg-background'>
        <IconButton
          onClick={() => {
            router.push('/scanner');
          }}
          size='medium'
        >
          <QrCodeScannerIcon fontSize='large' color='primary' />
        </IconButton>
      </div>

      <h1 className='text-2xl md:text-4xl font-bold text-center text-balance code'>
        {team.teamName}
      </h1>

      {team.currentStep < 0 ? (
        <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
          Scan the first QR code to start the game
        </h1>
      ) : (
        <Progress team={team} />
      )}
    </div>
  );
};

export default Dashboard;
