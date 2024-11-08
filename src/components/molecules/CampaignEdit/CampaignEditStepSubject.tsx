import { FC, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { StyledButton, StyledTextField } from '@/components/atoms';

import { SetupPhaseEnum } from '@/types';

export const CampaignEditStepSubject: FC<{
  failedCb?: () => void;
}> = ({ failedCb }) => {
  const {
    updateToServer,
    updateFieldValue,
    campaignData,
    _campaignId,
    isUpdating,
    isRedirecting,
    redirectCampaignStepPhase,
  } = useCampaignEditStore((state) => state);

  const onClickToSave = useCallback(async () => {
    const postData = {
      campaignId: _campaignId,
      setupPhase: SetupPhaseEnum.subject,
      nextSetupPhase: SetupPhaseEnum.design,
      data: {
        subjectLine: campaignData.subjectLine,
        previewText: campaignData.previewText,
      },
    };
    await updateToServer(postData);
  }, [
    _campaignId,
    campaignData.previewText,
    campaignData.subjectLine,
    updateToServer,
  ]);

  return (
    <Stack gap={3} maxWidth={600} width={'100%'}>
      <Typography variant={'h7'}>
        Add a subject line for this campaign
      </Typography>

      <Stack gap={1.5}>
        <Typography variant={'h7'}>Subject line</Typography>
        <Typography variant={'body2'}>
          The subject line is the first thing your recipients see, so it should
          clearly convey the email&#39;s content. For best results, keep it
          concise—under 50 characters.
        </Typography>
        <StyledTextField
          onChange={(e) => updateFieldValue('subjectLine', e.target.value)}
          placeholder={'Subject line'}
          slotProps={{
            htmlInput: {
              maxLength: 50,
            },
          }}
          value={campaignData?.subjectLine || ''}
        />
      </Stack>

      <Stack gap={1.5}>
        <Typography variant={'h7'}>Preview text</Typography>
        <Typography variant={'body2'}>
          Preview text gives recipients more insight into your email&#39;s
          content. For the best effect, keep it under 100 characters.
        </Typography>
        <StyledTextField
          multiline
          onChange={(e) => updateFieldValue('previewText', e.target.value)}
          placeholder={'Preview text'}
          rows={2}
          slotProps={{
            htmlInput: {
              maxLength: 100,
            },
          }}
          value={campaignData?.previewText || ''}
        />
      </Stack>

      <Stack flexDirection={'row'} gap={3} mt={3}>
        <StyledButton
          color={'info'}
          disabled={isUpdating || isRedirecting}
          loading={isRedirecting}
          onClick={() =>
            redirectCampaignStepPhase({
              campaignId: _campaignId!,
              nextSetupPhase: SetupPhaseEnum.recipient,
            })
          }
          size={'small'}
          sx={{ width: 64 }}
          variant={'text'}
        >
          Back
        </StyledButton>
        <StyledButton
          disabled={
            isUpdating ||
            isRedirecting ||
            !campaignData?.subjectLine ||
            !campaignData?.previewText
          }
          loading={isUpdating}
          onClick={onClickToSave}
          size={'small'}
          sx={{ width: 64 }}
        >
          Save
        </StyledButton>
      </Stack>
    </Stack>
  );
};
