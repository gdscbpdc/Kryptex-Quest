'use client';

import { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { useAuth } from '@/components/AuthProvider';
import TeamName from '@/components/registration/TeamName';
import TeamMembers from '@/components/registration/TeamMembers';
import { redirect } from 'next/navigation';
import { order } from '@/lib/order';

const RegisterPage = () => {
  const { registerWithEmailAndPassword, currentUser, team } = useAuth();

  if (currentUser && team) return redirect(order[team.step || 0]);

  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '' }]);

  const handleAddMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, { name: '' }]);
    }
  };

  const handleRemoveMember = (index) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newTeamMembers);
  };

  const handleMemberInputChange = (index, event) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index].name = event.target.value;
    setTeamMembers(newTeamMembers);
  };

  const handleSubmit = async (event) => {
    registerWithEmailAndPassword(
      teamLeaderEmail,
      teamLeaderPassword,
      teamName,
      teamMembers
    );
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
            {step === 1 ? 'Enter Your Team Name' : 'Register Your Team Members'}
          </Typography>

          {step === 1 && (
            <TeamName
              teamName={teamName}
              setTeamName={setTeamName}
              handleNextStep={() => setStep(2)}
              teamLeaderEmail={teamLeaderEmail}
              teamLeaderPassword={teamLeaderPassword}
              setTeamLeaderPassword={setTeamLeaderPassword}
              setTeamLeaderEmail={setTeamLeaderEmail}
            />
          )}

          {step === 2 && (
            <TeamMembers
              teamMembers={teamMembers}
              handleAddMember={handleAddMember}
              handleRemoveMember={handleRemoveMember}
              handleMemberInputChange={handleMemberInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
