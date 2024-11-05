import { useCallback, useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { CampaignStatus } from './index';
import { SetupPhaseEnum } from '@/types';

import ICON_BACK from './assets/icon_back.svg';
import ICON_RENAME from './assets/icon_rename.svg';

const steps = ['Sender', 'Recipients', 'Subject', 'Design', 'Schedule'];

const SETUP_PHASE_HASH = {
  [SetupPhaseEnum.sender]: 0,
  [SetupPhaseEnum.recipient]: 1,
  [SetupPhaseEnum.subject]: 2,
  [SetupPhaseEnum.design]: 3,
  [SetupPhaseEnum.schedule]: 4,
};

export const CampaignEditToolbar = () => {
  const router = useRouter();

  const { setupPhase, isFetching, campaignName, campaignStatus } =
    useCampaignEditStore((state) => state);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(SETUP_PHASE_HASH[setupPhase]);
  }, [setupPhase]);

  const onClickToBack = useCallback(() => {
    router.push('/campaigns/email');
    router.refresh();
  }, [router]);

  return isFetching ? (
    <CircularProgress
      sx={{
        background: 'background.white',
        color: 'action.loading',
      }}
    />
  ) : (
    <Stack gap={3} maxWidth={1000}>
      <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
        <Icon
          component={ICON_BACK}
          onClick={onClickToBack}
          sx={{ mr: 2, width: 20, height: 20, cursor: 'pointer' }}
        />
        <Typography variant={'h6'}>{campaignName}</Typography>
        <Icon
          component={ICON_RENAME}
          sx={{ width: 20, height: 20, cursor: 'pointer' }}
        />

        <CampaignStatus campaignStatus={campaignStatus} />
      </Stack>
      <Stack mb={3}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
  );
};
