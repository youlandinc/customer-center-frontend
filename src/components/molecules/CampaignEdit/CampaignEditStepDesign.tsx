import { FC, useCallback, useState } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useCampaignEditStore } from '@/stores/campaignEditStores/useCampaignEditStore';

import { AUTO_HIDE_DURATION } from '@/constant';

import {
  StyledButton,
  StyledDialog,
  StyledTextField,
  StyledUploadBox,
} from '@/components/atoms';

import { HttpError, SetupPhaseEnum } from '@/types';
import {
  _deleteCampaignTemplate,
  _testCampaignTemplate,
  _uploadCampaignTemplate,
} from '@/request';

import ICON_SEND from './assets/icon_send.svg';
import ICON_HTML from './assets/icon_html.svg';
import ICON_CLOSE from './assets/icon_close.svg';
import { useSwitch } from '@/hooks';

export const CampaignEditStepDesign: FC<{
  failedCb?: () => void;
}> = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    updateToServer,
    updateFieldValue,
    campaignData,
    _campaignId,
    isUpdating,
    isRedirecting,
    redirectCampaignStepPhase,
  } = useCampaignEditStore((state) => state);

  const [testLoading, setTestLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { open, visible, close } = useSwitch(false);

  const onClickToSave = useCallback(async () => {
    const postData = {
      campaignId: _campaignId,
      setupPhase: SetupPhaseEnum.design,
      nextSetupPhase: SetupPhaseEnum.schedule,
      data: {
        testEmail: campaignData.testEmail,
      },
    };
    await updateToServer(postData);
  }, [_campaignId, campaignData.testEmail, updateToServer]);

  const onUploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const postData = {
        campaignId: _campaignId!,
        formData,
      };
      setUploadLoading(true);
      try {
        const { data } = await _uploadCampaignTemplate(postData);
        const emailTemplate = {
          url: data.url,
          originalFileName: file.name,
          fileName: data.fileName,
          uploadTime: data.uploadTime,
        };
        updateFieldValue('emailTemplate', emailTemplate);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        setUploadLoading(false);
      }
    },
    [_campaignId, enqueueSnackbar, updateFieldValue],
  );

  const onClickToDelete = useCallback(async () => {
    if (deleteLoading || !_campaignId) {
      return;
    }
    setDeleteLoading(true);
    try {
      await _deleteCampaignTemplate(_campaignId!);
      updateFieldValue('emailTemplate', null);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setDeleteLoading(false);
      close();
    }
  }, [_campaignId, close, deleteLoading, enqueueSnackbar, updateFieldValue]);

  const onClickToSendTestEmail = useCallback(async () => {
    const postData = {
      campaignId: _campaignId!,
      email: campaignData.testEmail,
    };
    setTestLoading(true);
    try {
      await _testCampaignTemplate(postData);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setTestLoading(false);
    }
  }, [_campaignId, campaignData.testEmail, enqueueSnackbar]);

  return (
    <Stack gap={3} maxWidth={900} width={'100%'}>
      {campaignData?.emailTemplate?.url ? (
        <Stack
          alignItems={'center'}
          bgcolor={'#F0F4FF'}
          borderRadius={2}
          flexDirection={'row'}
          gap={1}
          height={48}
          px={1.5}
        >
          <Icon component={ICON_HTML} sx={{ width: 32, height: 32 }} />
          <Typography color={'text.secondary'}>
            {campaignData?.emailTemplate?.originalFileName}
          </Typography>

          <Icon
            component={ICON_CLOSE}
            onClick={open}
            sx={{
              width: 20,
              height: 20,
              ml: 'auto',
              cursor: 'pointer',
              '& > path': {
                fill: deleteLoading ? '#BABCBE' : '#9095A3',
              },
            }}
          />
        </Stack>
      ) : (
        <Stack height={300}>
          <StyledUploadBox
            accept={'text/html'}
            buttonSx={{
              width: 120,
              px: '0px !important',
              borderRadius: '4px !important',
              bgcolor: '#5B76BC !important',
            }}
            loading={uploadLoading}
            onUpload={onUploadFile}
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              borderRadius: 2,
              bgcolor: '#F4F6FA',
            }}
            uploadText={
              <Typography color={'text.secondary'} variant={'body2'}>
                Drag & drop or select a HTML file to upload
              </Typography>
            }
          />
        </Stack>
      )}

      <Stack gap={1.5}>
        <Typography variant={'subtitle1'}>Test send this campaign</Typography>
        <Typography color={'text.secondary'} variant={'body2'}>
          Test send this campaign to the email address(es) below. Multiple email
          addresses should be separated by commas.
        </Typography>
        <Stack alignItems={'center'} flexDirection={'row'} gap={3} mt={1.5}>
          <StyledTextField
            onChange={(e) => updateFieldValue('testEmail', e.target.value)}
            placeholder={'test@email.com, test2@email2.com'}
            value={campaignData?.testEmail || ''}
          />
          <StyledButton
            disabled={!campaignData?.testEmail || testLoading}
            loading={testLoading}
            onClick={onClickToSendTestEmail}
            sx={{
              flexShrink: 0,
              width: 180,
              px: '0 !important',
            }}
          >
            <Icon
              component={ICON_SEND}
              sx={{
                width: 24,
                height: 24,
                mr: 0.5,
                '& > path': {
                  fill:
                    !campaignData?.testEmail || testLoading
                      ? '#BABCBE'
                      : '#fff',
                },
              }}
            />
            Send test email
          </StyledButton>
        </Stack>
      </Stack>

      <Stack flexDirection={'row'} gap={3} mt={3}>
        <StyledButton
          color={'info'}
          disabled={isUpdating || isRedirecting}
          loading={isRedirecting}
          onClick={() =>
            redirectCampaignStepPhase({
              campaignId: _campaignId!,
              nextSetupPhase: SetupPhaseEnum.subject,
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
            !campaignData?.testEmail ||
            !campaignData?.emailTemplate
          }
          loading={isUpdating}
          onClick={onClickToSave}
          size={'small'}
          sx={{ width: 64 }}
        >
          Save
        </StyledButton>
      </Stack>

      <StyledDialog
        content={
          <Typography color={'text.secondary'} my={1.5} variant={'body2'}>
            You will have to re-upload a file before proceeding to the next
            step.
          </Typography>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={close}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color={'error'}
              disabled={deleteLoading}
              loading={deleteLoading}
              onClick={onClickToDelete}
              size={'small'}
              sx={{
                width: 72,
              }}
            >
              Delete
            </StyledButton>
          </Stack>
        }
        header={'Are you sure?'}
        open={visible}
      />
    </Stack>
  );
};
