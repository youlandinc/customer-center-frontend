import { FC, useCallback, useMemo } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { StyledButton } from '@/components/atoms';
import { CampaignStatus } from '@/components/molecules';

import { CampaignStatusEnum } from '@/types';

import ICON_BACK from './assets/icon_back.svg';

interface CampaignMarketingToolbarProps {
  campaignId: string | number;
  campaignStatus: CampaignStatusEnum;
  campaignName: string;
}

export const CampaignMarketingToolbar: FC<CampaignMarketingToolbarProps> = ({
  campaignId,
  campaignStatus = CampaignStatusEnum.sending,
  campaignName = '',
}) => {
  const router = useRouter();

  const onClickToBack = useCallback(() => {
    router.push('/campaigns/email');
    router.refresh();
  }, [router]);

  const renderButton = useMemo(() => {
    switch (campaignStatus) {
      case CampaignStatusEnum.sending:
        return (
          <StyledButton
            color={'error'}
            size={'small'}
            sx={{ ml: 'auto', width: 90 }}
          >
            Suspend
          </StyledButton>
        );
      case CampaignStatusEnum.suspended:
        return (
          <Stack flexDirection={'row'} flexShrink={0} gap={3} ml={'auto'}>
            <StyledButton color={'info'} size={'small'} variant={'outlined'}>
              Cancel sending
            </StyledButton>
            <StyledButton color={'success'} size={'small'}>
              Activate
            </StyledButton>
          </Stack>
        );
      default:
        return null;
    }
  }, [campaignStatus]);

  return (
    <Stack
      alignItems={'center'}
      flexDirection={'row'}
      gap={1}
      minWidth={1025}
      width={'100%'}
    >
      <Icon
        component={ICON_BACK}
        onClick={onClickToBack}
        sx={{ width: 20, height: 20, cursor: 'pointer' }}
      />
      <Typography variant={'h6'} width={'fit-content'}>
        {campaignName}
      </Typography>
      <CampaignStatus campaignStatus={campaignStatus} />
      {renderButton}
    </Stack>
  );
};
