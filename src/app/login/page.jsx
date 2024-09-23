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
  getAndUpdateTeam,
  getDecryptedItem,
  hashValue,
  setEncryptedItem,
} from '@/services/helperFunctions';
import Loading from '@/components/Loading';
import { db } from '@/services/firebase.config';
import { order } from '@/lib/order';

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
    <div className='max-w-xl'>
      <Card elevation={3} className='p-5'>
        <CardContent className='space-y-2 md:space-y-5'>
          <Typography
            variant='h5'
            align='center'
            gutterBottom
            fontWeight='bold'
          >
            Login Your Team
          </Typography>

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
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              fullWidth
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
