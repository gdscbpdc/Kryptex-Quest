'use client';

import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import StepLabel from '@mui/material/StepLabel';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase.config';
import { useAuth } from './AuthProvider';

const steps = [
  'Bio Informatics',
  'Cyber Security',
  'Cross Word',
  'QR Game',
  'Kryptex Runners',
  'AI ML',
];

const Progress = () => {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState();

  useEffect(() => {
    const getStep = async () => {
      try {
        const docRef = doc(db, 'teams', currentUser?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setActiveStep(docSnap.data().step);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getStep();

    console.log(activeStep);
  }, []);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel className='w-[120px] text-sm md:text-base'>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Progress;
