import { FC, useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';
import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { StyledButton, StyledTextField } from '@/components/atoms';

import { _createCampaign } from '@/request';
import { HttpError } from '@/types';

export const CampaignCreate: FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { updateCampaignId } = useCampaignEditStore((state) => state);

  const [createLoading, setCreateLoading] = useState(false);
  const [campaignName, setCampaignName] = useState('');

  const onClickToCancel = useCallback(() => {
    setCampaignName('');
    router.push('/campaigns/email');
  }, [router]);

  const onClickToCreate = useCallback(async () => {
    if (!campaignName) {
      return;
    }
    setCreateLoading(true);
    const postData = {
      campaignName,
    };
    try {
      const { data } = await _createCampaign(postData);
      updateCampaignId(data);
      router.push(`/campaigns/email/edit/${data}`);
      return router.refresh();
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setCampaignName('');
      setCreateLoading(false);
    }
  }, [campaignName, enqueueSnackbar, router, updateCampaignId]);

  return (
    <Stack
      gap={3}
      height={'100%'}
      maxWidth={600}
      overflow={'auto'}
      px={8}
      py={6}
    >
      <Typography variant={'h6'}>Create an email campaign</Typography>

      <Typography color={'text.secondary'} variant={'body2'}>
        Keep subscribers engaged by sharing your latest news, promoting your
        bestselling products, or announcing an upcoming event.
      </Typography>

      <Stack gap={1.5}>
        <Typography>Campaign name</Typography>
        <StyledTextField
          label={'Campaign name'}
          onChange={(e) => {
            setCampaignName(e.target.value);
          }}
          placeholder={'Campaign name'}
          value={campaignName}
        />
      </Stack>

      <Stack flexDirection={'row'} gap={3} mt={3}>
        <StyledButton
          color={'info'}
          onClick={onClickToCancel}
          size={'small'}
          variant={'text'}
        >
          Cancel
        </StyledButton>
        <StyledButton
          disabled={!campaignName || createLoading}
          loading={createLoading}
          onClick={onClickToCreate}
          size={'small'}
          sx={{ width: 160 }}
        >
          Create campaign
        </StyledButton>
      </Stack>
    </Stack>
  );
};
