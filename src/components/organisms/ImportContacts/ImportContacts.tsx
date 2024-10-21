import { FC, useMemo, useState } from 'react';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';

import {
  XLSXMatchColumn,
  XLSXPreUpload,
  XLSXUpload,
  XLSXUploadHeader,
} from '@/components/molecules';
import { DirectoryPageMode } from '@/types';
import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';

const steps = ['Upload a file', 'Match columns', 'Import'];

export const ImportContacts: FC = () => {
  const { setPageMode } = useDirectoryStore((state) => state);
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
    <Stack flex={1} gap={3}>
      <XLSXUploadHeader
        backStep={() => setPageMode(DirectoryPageMode.default)}
      />

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
