'use client';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

import { useAuth } from '@/components/AuthProvider';
import { redirect } from 'next/navigation';
import { order } from '@/lib/order';

const LoginPage = () => {
  const { loginWithEmailAndPassword, currentUser, team } = useAuth();

  if (currentUser && team) return redirect(order[team.step || 0]);

  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');

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
              onClick={async () => {
                await loginWithEmailAndPassword(
                  teamLeaderEmail,
                  teamLeaderPassword
                );
              }}
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
