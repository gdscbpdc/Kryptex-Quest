'use client';

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@mui/material';

import {
  hashValue,
  setEncryptedItem,
  getDecryptedItem,
} from '@/services/helperFunctions';
import Loading from '@/components/Loading';
import { db } from '@/services/firebase.config';
import AlertSnackbar from '@/components/AlertSnackbar';
import TeamDetails from '@/components/registration/TeamDetails';
import TeamMembers from '@/components/registration/TeamMembers';

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
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

  const handleStep1 = async (event) => {
    event.preventDefault();

    setButtonLoading(true);

    try {
      const teamsRef = collection(db, 'teams');

      const nameSnapshot = await getDocs(
        query(teamsRef, where('teamName', '==', teamName))
      );

      if (!nameSnapshot.empty) {
        setError('Team with same team name already exists.');
        console.log('A team with the same team name already exists!');
        return;
      }

      const emailSnapshot = await getDocs(
        query(teamsRef, where('teamLeaderEmail', '==', teamLeaderEmail))
      );

      if (!emailSnapshot.empty) {
        setError('Team with same email already exists.');
        console.log('A team with the same email already exists!');
        return;
      }

      if (teamLeaderPassword.length < 8) {
        setError('Password should be atleast 8 characters long.');
        console.log('Password should be atleast 8 characters long.');
        return;
      }

      setStep(2);
    } catch (error) {
      setError('Error registering team');
      console.error('Error registering team: ', error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleStep2 = async (event) => {
    event.preventDefault();

    setButtonLoading(true);

    const hashedPassword = hashValue(teamLeaderPassword);
    const teamData = {
      teamName,
      teamLeaderEmail,
      hashedPassword,
      teamMembers,
      currentStep: -1,
    };

    try {
      await setDoc(doc(db, 'teams', teamLeaderEmail), teamData);
      setEncryptedItem('team', teamData);
      router.replace('/');
    } catch (error) {
      setError('Error registering team');
      console.error('Error registering team: ', error);
    } finally {
      setButtonLoading(false);
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className='container max-w-lg w-full h-full flex flex-col items-center justify-center px-5 md:px-0'>
        <Card elevation={3} className='p-2 md:p-5 w-full'>
          <CardContent className='space-y-5 md:space-y-10'>
            <p className='text-xl md:text-3xl font-bold text-center text-balance'>
              {step === 1 ? 'Team Details' : 'Team Members'}
            </p>

            {step === 1 && (
              <TeamDetails
                teamName={teamName}
                setTeamName={setTeamName}
                handleSubmit={handleStep1}
                teamLeaderEmail={teamLeaderEmail}
                teamLeaderPassword={teamLeaderPassword}
                setTeamLeaderPassword={setTeamLeaderPassword}
                setTeamLeaderEmail={setTeamLeaderEmail}
                buttonLoading={buttonLoading}
              />
            )}

            {step === 2 && (
              <TeamMembers
                teamMembers={teamMembers}
                handleAddMember={handleAddMember}
                handleRemoveMember={handleRemoveMember}
                handleMemberInputChange={handleMemberInputChange}
                handleSubmit={handleStep2}
                buttonLoading={buttonLoading}
              />
            )}
          </CardContent>
        </Card>

        <AlertSnackbar error={error} setError={setError} />
      </div>
    );
  }
};

export default RegisterPage;
