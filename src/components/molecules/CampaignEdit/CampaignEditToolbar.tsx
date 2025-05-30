import { useCallback, useEffect, useState } from 'react';
import {
  Icon,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import { useRouter } from 'nextjs-toploader/app';

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

const STEP_PHASE_VALUE = [
  SetupPhaseEnum.sender,
  SetupPhaseEnum.recipient,
  SetupPhaseEnum.subject,
  SetupPhaseEnum.design,
  SetupPhaseEnum.schedule,
];

export const CampaignEditToolbar = () => {
  const router = useRouter();

  const {
    setupPhase,
    campaignName,
    campaignStatus,
    setupPhaseStatus,
    _campaignId,
    redirectCampaignStepPhase,
  } = useCampaignEditStore((state) => state);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(SETUP_PHASE_HASH[setupPhase]);
  }, [setupPhase]);

  const onClickToBack = useCallback(() => {
    router.push('/campaigns/email');
    router.refresh();
  }, [router]);

  return (
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
        <Stepper activeStep={activeStep} nonLinear>
          {steps.map((label, index) => (
            <Step
              completed={
                STEP_PHASE_VALUE[index] === setupPhase
                  ? false
                  : setupPhaseStatus[STEP_PHASE_VALUE[index]]
              }
              key={label}
            >
              <StepButton
                disabled={!setupPhaseStatus[STEP_PHASE_VALUE[index]]}
                onClick={async () => {
                  const postSetupPhase = STEP_PHASE_VALUE[index];
                  if (postSetupPhase === setupPhase) {
                    return;
                  }
                  await redirectCampaignStepPhase({
                    campaignId: _campaignId!,
                    nextSetupPhase: postSetupPhase,
                    isShowLoading: false,
                  });
                }}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
  );
};
