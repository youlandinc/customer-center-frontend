'use client';
import { useEffect, useMemo, useState } from 'react';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';

import {
  XLSXMatchColumn,
  XLSXPreUpload,
  XLSXUpload,
  XLSXUploadHeader,
} from '@/components/molecules';

const steps = ['Upload a file', 'Match columns', 'Import'];

interface ImportContactsProps {
  back: () => void;
}

export const ImportContacts = ({
  back = () => console.log('cancel import'),
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const renderNode = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <XLSXPreUpload nextStep={() => setActiveStep(1)} />;
      case 1:
        return (
          <XLSXMatchColumn
            backStep={() => setActiveStep(0)}
            nextStep={() => setActiveStep(2)}
          />
        );
      case 2:
        return (
          <XLSXUpload
            backStep={() => setActiveStep(1)}
            nextStep={() => setActiveStep(0)}
          />
        );
    }
  }, [activeStep]);

  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <XLSXUploadHeader backStep={back} />

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
