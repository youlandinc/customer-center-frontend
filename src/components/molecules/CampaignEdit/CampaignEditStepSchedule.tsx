import { FC, useCallback, useMemo, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { addDays, isValid, set } from 'date-fns';

import { AUTO_HIDE_DURATION } from '@/constant';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import {
  StyledButton,
  StyledDatePickerStyles,
  StyledTextFieldNumber,
} from '@/components/atoms';

import { CampaignStatusEnum, HttpError, SetupPhaseEnum } from '@/types';
import { _cancelScheduleCampaign } from '@/request';

export const CampaignEditStepSchedule: FC<{
  failedCb: () => void;
}> = ({ failedCb }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    updateToServer,
    updateFieldValue,
    campaignData,
    _campaignId,
    isUpdating,
    isRedirecting,
    redirectCampaignStepPhase,
    campaignStatus,
    updateCampaignStatus,
  } = useCampaignEditStore((state) => state);

  const [cancelling, setCancelling] = useState(false);

  const isScheduled = useMemo(
    () => campaignStatus === CampaignStatusEnum.scheduled,
    [campaignStatus],
  );

  const onClickToSave = useCallback(async () => {
    const postData = {
      campaignId: _campaignId,
      setupPhase: SetupPhaseEnum.schedule,
      nextSetupPhase: SetupPhaseEnum.schedule,
      data: {
        sendNow: campaignData.sendNow,
        scheduleTime: campaignData.sendNow ? null : campaignData.scheduleTime,
        quantity: campaignData.quantity,
      },
    };
    await updateToServer(postData, failedCb);
    router.push('/campaigns/email');
    router.refresh();
  }, [
    _campaignId,
    campaignData.quantity,
    campaignData.scheduleTime,
    campaignData.sendNow,
    failedCb,
    router,
    updateToServer,
  ]);

  const onClickToCancelSchedule = useCallback(async () => {
    setCancelling(true);
    try {
      await _cancelScheduleCampaign(_campaignId!);
      updateCampaignStatus(CampaignStatusEnum.draft);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setCancelling(false);
    }
  }, [_campaignId, enqueueSnackbar, updateCampaignStatus]);

  const dayDone = useMemo(() => {
    const dividend = campaignData.recipientCount;
    const divisor = campaignData.quantity;
    const quotient = dividend / divisor;
    return !isNaN(quotient) && isFinite(quotient) ? Math.ceil(quotient) : 0;
  }, [campaignData.quantity, campaignData.recipientCount]);

  const TomorrowTenAM = useMemo(() => {
    const tomorrow = addDays(new Date(), 1);
    return set(tomorrow, { hours: 10, minutes: 0, seconds: 0 });
  }, []);

  const isFormValid = useMemo(() => {
    if (campaignData.sendNow) {
      return !!campaignData.quantity;
    }
    return !!campaignData.quantity && isValid(campaignData.scheduleTime);
  }, [campaignData.quantity, campaignData.scheduleTime, campaignData.sendNow]);

  const renderColor = useMemo(() => {
    if (isScheduled) {
      return {
        now: {
          bgcolor: campaignData.sendNow ? '#EDEDED' : 'transparent',
          borderColor: '#D2D6E1',
          color: 'text.secondary',
        },
        schedule: {
          bgcolor: !campaignData.sendNow ? '#EDEDED' : 'transparent',
          borderColor: '#D2D6E1',
          color: 'text.secondary',
        },
      };
    }
    return {
      now: {
        bgcolor: 'transparent',
        borderColor: campaignData.sendNow ? '#5B76BC' : '#D2D6E1',
        color: campaignData.sendNow ? '#2B52B6' : 'text.secondary',
      },
      schedule: {
        bgcolor: 'transparent',
        borderColor: !campaignData.sendNow ? '#5B76BC' : '#D2D6E1',
        color: !campaignData.sendNow ? '#2B52B6' : 'text.secondary',
      },
    };
  }, [campaignData.sendNow, isScheduled]);

  return (
    <Stack gap={3} maxWidth={600} width={'100%'}>
      <Stack gap={1.5}>
        <Stack flexDirection={'row'} gap={3}>
          <Typography
            bgcolor={renderColor.now.bgcolor}
            border={'2px solid'}
            borderColor={renderColor.now.borderColor}
            borderRadius={2}
            color={renderColor.now.color}
            onClick={() => {
              if (isScheduled) {
                return;
              }
              updateFieldValue('sendNow', true);
            }}
            px={4}
            py={1.5}
            sx={{
              cursor: isScheduled ? 'default' : 'pointer',
              transition: 'all .3s',
            }}
            variant={'subtitle2'}
          >
            Send now
          </Typography>
          <Typography
            bgcolor={renderColor.schedule.bgcolor}
            border={'2px solid'}
            borderColor={renderColor.schedule.borderColor}
            borderRadius={2}
            color={renderColor.schedule.color}
            onClick={() => {
              if (isScheduled) {
                return;
              }
              updateFieldValue('sendNow', false);
              if (!campaignData.scheduleTime) {
                updateFieldValue('scheduleTime', TomorrowTenAM);
              }
            }}
            px={4}
            py={1.5}
            sx={{
              cursor: isScheduled ? 'default' : 'pointer',
              transition: 'all .3s',
            }}
            variant={'subtitle2'}
          >
            Schedule for later
          </Typography>
        </Stack>

        <Typography color={'text.secondary'} variant={'body2'}>
          Send your campaign now to reach your audience instantly and capture
          their attention right away.
        </Typography>
      </Stack>

      {!campaignData?.sendNow && (
        <DateTimePicker
          defaultValue={TomorrowTenAM}
          disabled={isScheduled}
          disablePast
          label={'Date / Time'}
          onChange={(date) => {
            updateFieldValue('scheduleTime', date);
          }}
          sx={{
            ...StyledDatePickerStyles,
          }}
          value={
            campaignData?.scheduleTime
              ? new Date(campaignData?.scheduleTime)
              : TomorrowTenAM
          }
        />
      )}

      <Stack gap={1.5}>
        <Typography variant={'h7'}>
          Please select the number of emails to send per day.
        </Typography>
        <Typography variant={'body2'}>
          When the daily limit is reached, the remaining emails will be sent the
          following day.
        </Typography>
        <Stack
          alignItems={isScheduled ? 'center' : 'unset'}
          flexDirection={isScheduled ? 'row' : 'column'}
          gap={0.5}
        >
          <StyledTextFieldNumber
            disabled={isScheduled}
            label={'Send quantity'}
            onValueChange={({ floatValue }) =>
              updateFieldValue('quantity', floatValue as number)
            }
            sx={{ width: 300 }}
            value={campaignData?.quantity || ''}
          />
          {dayDone >= 1 && (
            <Typography
              color={isScheduled ? '#4A6BB7' : 'text.secondary'}
              sx={{
                width: 'fit-content',
                flexShrink: 0,
                ml: isScheduled ? 'auto' : 0,
              }}
              variant={'body3'}
            >
              Completed in <b style={{ color: 'inherit' }}>{dayDone}</b> days.
            </Typography>
          )}
        </Stack>
      </Stack>

      {isScheduled ? (
        <StyledButton
          color={'error'}
          disabled={cancelling}
          loading={cancelling}
          onClick={onClickToCancelSchedule}
          size={'small'}
          sx={{ width: 120, mt: 3 }}
        >
          Cancel send
        </StyledButton>
      ) : (
        <Stack flexDirection={'row'} gap={3} mt={3}>
          <StyledButton
            color={'info'}
            disabled={isUpdating || isRedirecting}
            loading={isRedirecting}
            onClick={() =>
              redirectCampaignStepPhase({
                campaignId: _campaignId!,
                nextSetupPhase: SetupPhaseEnum.design,
              })
            }
            size={'small'}
            sx={{ width: 64 }}
            variant={'text'}
          >
            Back
          </StyledButton>
          <StyledButton
            disabled={isUpdating || isRedirecting || !isFormValid}
            loading={isUpdating}
            onClick={onClickToSave}
            size={'small'}
            sx={{ width: 120 }}
          >
            {campaignData?.sendNow ? 'Send now' : 'Schedule'}
          </StyledButton>
        </Stack>
      )}
    </Stack>
  );
};
