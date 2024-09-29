'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  hashValue,
  setEncryptedItem,
  getDecryptedItem,
} from '@/services/helperFunctions';
import Loading from '@/components/Loading';
import { db } from '@/services/firebase.config';
import AlertSnackbar from '@/components/AlertSnackbar';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');

  useEffect(() => {
    const team = getDecryptedItem('team');
    if (team) {
      router.replace('/');
    }
    setLoading(false);
  }, []);

  const handleSubmit = async () => {
    setButtonLoading(true);

    try {
      const teamDoc = await getDoc(doc(db, 'teams', teamLeaderEmail));

      if (!teamDoc.exists) {
        setError('Team not found');
        return;
      }

      const teamData = teamDoc.data();
      const hashedPassword = hashValue(teamLeaderPassword);

      if (hashedPassword === teamData.hashedPassword) {
        setEncryptedItem('team', teamData);
        router.replace('/');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Email not found');
      console.error('Email not found:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container max-w-lg w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
        <Card elevation={3} className='p-2 md:p-5 w-full'>
          <CardContent className='space-y-5 md:space-y-10'>
            <p className='text-xl md:text-3xl font-bold text-center text-balance'>
              Login Your Team
            </p>

            <div className='space-y-5'>
              <TextField
                fullWidth
                type='email'
                variant='outlined'
                value={teamLeaderEmail}
                label='Team Leader Email'
                onChange={(e) => setTeamLeaderEmail(e.target.value)}
              />

              <TextField
                fullWidth
                type='password'
                label='Password'
                variant='outlined'
                value={teamLeaderPassword}
                onChange={(e) => setTeamLeaderPassword(e.target.value)}
              />

              <Button
                fullWidth
                size='large'
                color='primary'
                variant='contained'
                onClick={handleSubmit}
                disabled={!teamLeaderEmail || !teamLeaderPassword}
              >
                {buttonLoading ? <CircularProgress size={26} /> : 'Login'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AlertSnackbar error={error} setError={setError} />
      </div>
    );
  }
};

export default LoginPage;
