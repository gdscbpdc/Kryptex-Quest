'use client';

import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import { Step, Stepper, StepLabel, styled, Box } from '@mui/material';
import { order } from '@/lib/order';
import Link from 'next/link';

const steps = [
  'Bio Informatics',
  'Cyber Security',
  'Cross Word',
  'Kryptex Runners',
  'AI ML',
  'QR Game',
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#9fef00',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#9fef00',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    borderRadius: 1,
    backgroundColor: '#9fef00',
  },
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 20,
    [`& .${stepConnectorClasses.line}`]: {
      minHeight: 30,
      width: 2,
    },
  },
}));

const StepIcon = ({ isCompleted, currentStep }) => {
  return (
    <Box
      sx={{
        width: { xs: 40, md: 50 },
        height: { xs: 40, md: 50 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: isCompleted
          ? '#9fef00'
          : currentStep
          ? '#ffaf00'
          : '#ff3e3e',
        color: '#fff',
        zIndex: 2,
      }}
    >
      {isCompleted ? (
        <CheckIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
      ) : currentStep ? (
        <></>
      ) : (
        <LockIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
      )}
    </Box>
  );
};

const Progress = ({ team }) => {
  const currentStep = team.currentStep;
  const completedSteps = team.completedSteps;

  return (
    <>
      <div className='hidden md:block w-full'>
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<CustomConnector />}
        >
          {steps.map((label, index) => {
            const isCompleted = completedSteps?.includes(order[index]);

            return (
              <Step key={label}>
                <Link
                  href={
                    isCompleted || currentStep === index ? order[index] : ''
                  }
                  className={
                    isCompleted || currentStep === index
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }
                >
                  <StepLabel
                    StepIconComponent={() => (
                      <StepIcon
                        isCompleted={isCompleted}
                        currentStep={currentStep === index}
                      />
                    )}
                  >
                    <p className='font-bold text-white text-lg'>
                      {isCompleted || currentStep === index ? label : '???'}
                    </p>
                  </StepLabel>
                </Link>
              </Step>
            );
          })}
        </Stepper>
      </div>

      <div className='block md:hidden'>
        <Stepper
          activeStep={currentStep}
          connector={<CustomConnector />}
          orientation='vertical'
        >
          {steps.map((label, index) => {
            const isCompleted = completedSteps?.includes(order[index]);

            return (
              <Step key={label}>
                <Link
                  href={
                    isCompleted || currentStep === index ? order[index] : ''
                  }
                  className={
                    isCompleted || currentStep === index
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }
                >
                  <StepLabel
                    StepIconComponent={() => (
                      <StepIcon
                        isCompleted={isCompleted}
                        currentStep={currentStep === index}
                      />
                    )}
                  >
                    <p className='font-bold text-white'>
                      {isCompleted || currentStep === index ? label : '???'}
                    </p>
                  </StepLabel>
                </Link>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </>
  );
};

export default Progress;
