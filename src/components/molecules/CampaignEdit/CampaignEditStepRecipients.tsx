import { FC, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { StyledButton, StyledCheckbox, StyledSelect } from '@/components/atoms';

import { SetupPhaseEnum } from '@/types';

export const CampaignEditStepRecipients: FC<{
  failedCb: () => void;
}> = ({ failedCb }) => {
  const {
    isRedirecting,
    isUpdating,
    updateToServer,
    campaignData,
    _campaignId,
    segmentList,
    redirectCampaignStepPhase,
    updateFieldValue,
    fetchCampaignDetails,
  } = useCampaignEditStore((state) => state);

  const onClickToSave = useCallback(async () => {
    const postData = {
      campaignId: _campaignId,
      setupPhase: SetupPhaseEnum.recipient,
      nextSetupPhase: SetupPhaseEnum.subject,
      data: {
        segmentId: campaignData.segmentId,
        segmentName: segmentList.find(
          (item) => item.value === campaignData.segmentId,
        )?.label,
        markSpam: campaignData.markSpam,
      },
    };
    await updateToServer(postData, failedCb);
    await fetchCampaignDetails(_campaignId!, failedCb, false);
  }, [
    _campaignId,
    campaignData.markSpam,
    campaignData.segmentId,
    failedCb,
    fetchCampaignDetails,
    segmentList,
    updateToServer,
  ]);

  return (
    <Stack gap={3} maxWidth={600} width={'100%'}>
      <Stack gap={1.5}>
        <Typography variant={'h7'}>Send to</Typography>
        <StyledSelect
          defaultValue={''}
          label={'Segments'}
          noResultContent={'No segments found'}
          onChange={(e) => {
            updateFieldValue('segmentId', e.target.value as string | number);
          }}
          options={segmentList}
          value={campaignData?.segmentId}
        />
        <StyledCheckbox
          checked={campaignData?.markSpam}
          label={'Send to accounts marked as spam'}
          onChange={(e) => {
            updateFieldValue('markSpam', e.target.checked);
          }}
          sx={{ mt: 1.5 }}
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
              nextSetupPhase: SetupPhaseEnum.sender,
            })
          }
          size={'small'}
          sx={{ width: 64 }}
          variant={'text'}
        >
          Back
        </StyledButton>
        <StyledButton
          disabled={isUpdating || isRedirecting || !campaignData?.segmentId}
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
