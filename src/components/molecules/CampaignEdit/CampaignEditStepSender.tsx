import { FC, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { CampaignStatusEnum, SetupPhaseEnum } from '@/types';

import { StyledButton, StyledTextField } from '@/components/atoms';

export const CampaignEditStepSender: FC<{ failedCb?: () => void }> = () => {
  const {
    updateToServer,
    updateFieldValue,
    campaignData,
    _campaignId,
    isUpdating,
    isRedirecting,
    campaignStatus,
  } = useCampaignEditStore((state) => state);

  const onClickToSave = useCallback(async () => {
    const postData = {
      campaignId: _campaignId,
      setupPhase: SetupPhaseEnum.sender,
      nextSetupPhase: SetupPhaseEnum.recipient,
      data: {
        name: campaignData.name,
        email: campaignData.email,
      },
    };
    await updateToServer(postData);
  }, [_campaignId, campaignData.email, campaignData.name, updateToServer]);

  return (
    <Stack gap={3} maxWidth={600} width={'100%'}>
      <Typography variant={'h7'}>
        Who is sending this email campaign?
      </Typography>

      <Stack gap={1.5}>
        <Typography variant={'h7'}>Email address</Typography>
        <Typography variant={'body2'}>
          Enter the email address you want your emails to send from.
        </Typography>
        <StyledTextField
          disabled={
            isUpdating ||
            isRedirecting ||
            campaignStatus === CampaignStatusEnum.sending
          }
          onChange={(e) => updateFieldValue('email', e.target.value)}
          placeholder={'Email address'}
          value={campaignData?.email || ''}
        />
      </Stack>

      <Stack gap={1.5}>
        <Typography variant={'h7'}>Name</Typography>
        <Typography variant={'body2'}>
          Enter a name (e.g. your company name) to help recipients recognize you
          in their inbox.
        </Typography>
        <StyledTextField
          disabled={
            isUpdating ||
            isRedirecting ||
            campaignStatus === CampaignStatusEnum.sending
          }
          onChange={(e) => updateFieldValue('name', e.target.value)}
          placeholder={'Name'}
          value={campaignData?.name || ''}
        />
      </Stack>

      <StyledButton
        disabled={
          !campaignData?.name ||
          !campaignData?.email ||
          isUpdating ||
          isRedirecting ||
          campaignStatus === CampaignStatusEnum.sending
        }
        loading={isUpdating}
        onClick={onClickToSave}
        size={'small'}
        sx={{ width: 60, mt: 3 }}
      >
        Save
      </StyledButton>
    </Stack>
  );
};
