'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { useAuth } from '@/components/AuthProvider';
import TeamName from '@/components/registration/TeamName';
import TeamMembers from '@/components/registration/TeamMembers';

const RegisterPage = () => {
  const router = useRouter();
  const { currentUser, registerWithEmailAndPassword } = useAuth();

  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '' }]);

  useEffect(() => {
    console.log(currentUser);
  }, []);

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
    registerWithEmailAndPassword(teamLeaderEmail, teamLeaderPassword, teamName);

    router.replace('/cross_word');
  };

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
