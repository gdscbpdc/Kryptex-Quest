'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import TeamName from '@/components/registration/TeamName';
import TeamMembers from '@/components/registration/TeamMembers';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.config';
import {
  getDecryptedItem,
  hashValue,
  setEncryptedItem,
} from '@/services/helperFunctions';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPassword, setTeamLeaderPassword] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '' }]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hashedPassword = await hashValue(teamLeaderPassword);
    const teamData = {
      teamName,
      teamLeaderEmail,
      hashedPassword,
      teamMembers,
      currentStep: 0,
    };
    try {
      await setDoc(doc(db, 'teams', teamLeaderEmail), teamData);
      setEncryptedItem('team', teamData);
      router.replace('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

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
