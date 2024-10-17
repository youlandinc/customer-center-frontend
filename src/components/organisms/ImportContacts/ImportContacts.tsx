'use client';
import { useMemo, useState } from 'react';
import { Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { StyledButton } from '@/components/atoms';
import { XLSXMatchColumn, XLSXPreUpload } from '@/components/molecules';

const steps = ['Upload a file', 'Match columns', 'Import'];

interface ImportContactsProps {
  back: () => void;
}

export const ImportContacts = ({
  back = () => console.log('cancel import'),
}) => {
  const [activeStep, setActiveStep] = useState(1);

  const renderNode = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <XLSXPreUpload nextStep={() => setActiveStep(1)} />;
      case 1:
        return <XLSXMatchColumn />;
      case 2:
        return <div>Step {activeStep}</div>;
    }
  }, [activeStep]);

  return (
    <Stack gap={3} height={'100%'}>
      <Stack alignItems={'center'} flexDirection={'row'} gap={3}>
        <Typography variant={'h6'}>Import contacts</Typography>

        <Typography
          color={'primary.main'}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          variant={'body2'}
        >
          View history
        </Typography>

        <StyledButton
          color={'info'}
          onClick={back}
          size={'small'}
          sx={{ ml: 'auto' }}
          variant={'outlined'}
        >
          Cancel import
        </StyledButton>
      </Stack>

      <Stack width={660}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>

      {renderNode}
    </Stack>
  );
};
