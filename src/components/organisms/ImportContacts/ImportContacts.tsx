'use client';

import { XLSXUpload } from '@/components/molecules';
import { Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { StyledButton } from '@/components/atoms';

const steps = ['Upload a file', 'Match columns', 'Import'];

interface ImportContactsProps {
  back: () => void;
}

export const ImportContacts = ({
  back = () => console.log('cancel import'),
}) => {
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
        <Stepper activeStep={1}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>

      <XLSXUpload />
    </Stack>
  );
};
