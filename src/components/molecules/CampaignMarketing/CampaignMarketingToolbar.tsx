import { FC, useCallback, useMemo, useState } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'nextjs-toploader/app';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';
import { useSwitch } from '@/hooks';

import { StyledButton, StyledDialog } from '@/components/atoms';
import { CampaignStatus } from '@/components/molecules';

import { _cancelScheduleCampaign, _updateCampaignState } from '@/request';
import { CampaignStatusEnum, HttpError } from '@/types';

import ICON_BACK from './assets/icon_back.svg';

interface CampaignMarketingToolbarProps {
  campaignId: string | number;
  campaignStatus: CampaignStatusEnum;
  campaignName: string;
  cb: () => void | Promise<void>;
}

export const CampaignMarketingToolbar: FC<CampaignMarketingToolbarProps> = ({
  campaignId,
  campaignStatus = CampaignStatusEnum.sending,
  campaignName = '',
  cb,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    open: cancelOpen,
    close: cancelClose,
    visible: cancelVisible,
  } = useSwitch(false);

  const {
    open: suspendOpen,
    close: suspendClose,
    visible: suspendVisible,
  } = useSwitch(false);

  const [actionLoading, setActionLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const onClickToBack = useCallback(() => {
    router.push('/campaigns/email');
    router.refresh();
  }, [router]);

  const onClickToAction = useCallback(
    async (action: 'suspend' | 'active') => {
      const postData = {
        campaignId,
        active: action === 'active',
      };
      setActionLoading(true);
      try {
        await _updateCampaignState(postData);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        await cb();
        setActionLoading(false);
        action === 'suspend' && suspendClose();
      }
    },
    [campaignId, cb, enqueueSnackbar, suspendClose],
  );

  const onClickToCancel = useCallback(async () => {
    setCancelLoading(true);
    try {
      await _cancelScheduleCampaign(campaignId);
      await cb();
      router.push(`/campaigns/email/edit/${campaignId}`);
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
      setCancelLoading(false);
      cancelClose();
    }
  }, [campaignId, cancelClose, cb, enqueueSnackbar, router]);

  const renderButton = useMemo(() => {
    switch (campaignStatus) {
      case CampaignStatusEnum.sending:
        return (
          <StyledButton
            color={'error'}
            onClick={suspendOpen}
            size={'small'}
            sx={{ ml: 'auto', width: 90 }}
          >
            Suspend
          </StyledButton>
        );
      case CampaignStatusEnum.suspended:
        return (
          <Stack flexDirection={'row'} flexShrink={0} gap={3} ml={'auto'}>
            <StyledButton
              color={'info'}
              disabled={actionLoading}
              onClick={cancelOpen}
              size={'small'}
              variant={'outlined'}
            >
              Cancel sending
            </StyledButton>
            <StyledButton
              color={'success'}
              disabled={actionLoading}
              loading={actionLoading}
              onClick={() => onClickToAction('active')}
              size={'small'}
              sx={{ width: 90 }}
            >
              Activate
            </StyledButton>
          </Stack>
        );
      default:
        return null;
    }
  }, [actionLoading, campaignStatus, cancelOpen, onClickToAction, suspendOpen]);

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

      <StyledDialog
        content={
          <Typography color={'text.secondary'} my={1.5} variant={'body2'}>
            Are you sure you want to suspend the campaign?
          </Typography>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={suspendClose}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color={'error'}
              disabled={actionLoading}
              loading={actionLoading}
              onClick={() => onClickToAction('suspend')}
              size={'small'}
              sx={{
                width: 72,
              }}
            >
              Confirm
            </StyledButton>
          </Stack>
        }
        header={'Confirmation of suspension'}
        open={suspendVisible}
      />

      <StyledDialog
        content={
          <Typography color={'text.secondary'} my={1.5} variant={'body2'}>
            Are you sure you want to cancel sending the campaign? Once canceled,
            the remaining emails will not be sent.
          </Typography>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={cancelClose}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color={'error'}
              disabled={cancelLoading}
              loading={cancelLoading}
              onClick={onClickToCancel}
              size={'small'}
              sx={{
                width: 72,
              }}
            >
              Confirm
            </StyledButton>
          </Stack>
        }
        header={'Confirmation of cancellation'}
        open={cancelVisible}
      />
    </Stack>
  );
};
