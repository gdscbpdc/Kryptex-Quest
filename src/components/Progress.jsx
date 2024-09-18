import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Bio Informatics', 'Cross Word', 'Web'];

const Progress = () => {
  return (
    <Stepper activeStep={1} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel className='w-[120px] text-sm md:text-lg'>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Progress;
