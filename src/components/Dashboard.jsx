import { IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Progress from './Progress';

const Dashboard = ({ team }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 md:gap-10 w-full'>
      <div className='absolute bottom-5 right-5 p-2 rounded-lg bg-background'>
        <IconButton onClick={() => {}} size='large'>
          <QrCodeScannerIcon fontSize='large' color='primary' />
        </IconButton>
      </div>

      <h1 className='text-2xl md:text-4xl font-bold text-center text-balance code'>
        Team {team.teamName}
      </h1>

      {team.currentStep < 0 ? (
        <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
          Scan the first QR code to start the game
        </h1>
      ) : (
        <>
          <Progress team={team} />

          <h1 className='text-2xl md:text-4xl font-bold text-center text-balance'>
            Scan the next QR code to continue
          </h1>
        </>
      )}
    </div>
  );
};

export default Dashboard;
