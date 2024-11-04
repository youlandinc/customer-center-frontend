import { FC, useCallback, useEffect, useMemo } from 'react';
import { Fade, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import {
  CampaignEditStepDesign,
  CampaignEditStepRecipients,
  CampaignEditStepSchedule,
  CampaignEditStepSender,
  CampaignEditStepSubject,
  CampaignEditToolbar,
} from './index';

import { SetupPhaseEnum } from '@/types';

interface CampaignEditProps {
  campaignId: string | number;
}

// steps
// 1. edit sender
// 2. edit recipients
// 3. edit subject
// 4. edit design
// 5. edit schedule

export const CampaignEdit: FC<CampaignEditProps> = ({ campaignId }) => {
  const router = useRouter();

  const { setupPhase, fetchCampaignDetails, fetchSegmentList, isFetching } =
    useCampaignEditStore((state) => state);

  useEffect(
    () => {
      fetchCampaignDetails(campaignId, failedCb);
      fetchSegmentList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const failedCb = useCallback(() => {
    router.push('/campaigns/email');
    router.refresh();
  }, [router]);

  const renderForm = useMemo(() => {
    switch (setupPhase) {
      case SetupPhaseEnum.sender:
        return <CampaignEditStepSender failedCb={failedCb} />;
      case SetupPhaseEnum.recipient:
        return <CampaignEditStepRecipients failedCb={failedCb} />;
      case SetupPhaseEnum.subject:
        return <CampaignEditStepSubject failedCb={failedCb} />;
      case SetupPhaseEnum.design:
        return <CampaignEditStepDesign failedCb={failedCb} />;
      case SetupPhaseEnum.schedule:
        return <CampaignEditStepSchedule failedCb={failedCb} />;
    }
  }, [failedCb, setupPhase]);

  return (
    <Stack
      gap={3}
      height={'100%'}
      overflow={'auto'}
      px={8}
      py={6}
      width={'100%'}
    >
      <CampaignEditToolbar />

      <Fade in={!isFetching}>
        <Stack flex={1}>{renderForm}</Stack>
      </Fade>
    </Stack>
  );
};
