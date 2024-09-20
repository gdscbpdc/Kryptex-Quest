'use client';

import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useAuth } from '../../components/AuthProvider';

const Login = () => {
  const { loginWithEmailAndPassword } = useAuth();

  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');

  return (
    <div className='w-full max-w-lg'>
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
              onClick={() =>
                loginWithEmailAndPassword(teamLeaderEmail, teamLeaderPassword)
              }
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

export default Login;
