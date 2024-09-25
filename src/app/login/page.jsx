'use client';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

import {
  getDecryptedItem,
  hashValue,
  setEncryptedItem,
} from '@/services/helperFunctions';
import Loading from '@/components/Loading';
import { db } from '@/services/firebase.config';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');

  useEffect(() => {
    const team = getDecryptedItem('team');
    if (team) {
      router.replace('/');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    try {
      const teamDoc = await getDoc(doc(db, 'teams', teamLeaderEmail));
      if (!teamDoc.exists) throw new Error('Team not found');
      const teamData = teamDoc.data();
      const hashedPassword = await hashValue(teamLeaderPassword);
      if (hashedPassword === teamData.hashedPassword) {
        setEncryptedItem('team', teamData);
        router.replace('/');
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='container max-w-lg w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
      <Card elevation={3} className='p-2 md:p-5'>
        <CardContent className='space-y-5 md:space-y-10'>
          <p className='text-xl md:text-3xl font-bold text-center text-balance'>
            Login Your Team
          </p>

          <div className='space-y-2 md:space-y-5'>
            <TextField
              label='Team Leader Email'
              variant='outlined'
              fullWidth
              type='email'
              value={teamLeaderEmail}
              onChange={(e) => setTeamLeaderEmail(e.target.value)}
              required
            />

            <TextField
              label='Password'
              variant='outlined'
              type='password'
              fullWidth
              value={teamLeaderPassword}
              onChange={(e) => setTeamLeaderPassword(e.target.value)}
              required
            />

            <Button
              fullWidth
              color='primary'
              variant='contained'
              onClick={handleSubmit}
              disabled={!teamLeaderEmail || !teamLeaderPassword}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
