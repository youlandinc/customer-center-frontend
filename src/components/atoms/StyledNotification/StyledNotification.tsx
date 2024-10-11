import { forwardRef, useCallback, useMemo } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { SnackbarContent, useSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';

import NOTIFICATION_INFO from './notification_info.svg';
import NOTIFICATION_SUCCESS from './notification_success.svg';
import NOTIFICATION_WARNING from './notification_warning.svg';
import NOTIFICATION_ERROR from './notification_error.svg';

interface StyledNotificationProps {
  header?: string;
  isSimple?: boolean;
}

export const StyledNotification = forwardRef<
  HTMLDivElement,
  StyledNotificationProps & any
>(({ isSimple = true, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  const computedData = useMemo(() => {
    switch (props.variant) {
      case 'info':
        return {
          bgcolor: '#F4F7FD',
          color: '#636A7C',
          icon: NOTIFICATION_INFO,
        };
      case 'success':
        return {
          bgcolor: '#ECFBF5',
          color: '#4FBF67',
          icon: NOTIFICATION_SUCCESS,
        };
      case 'warning':
        return {
          bgcolor: '#FFF9EA',
          color: '#E59A00',
          icon: NOTIFICATION_WARNING,
        };
      case 'error':
        return {
          bgcolor: '#F6EBE8',
          color: '#DE6449',
          icon: NOTIFICATION_ERROR,
        };
      default:
        return {
          bgcolor: '#F4F7FD',
          color: '#636A7C',
          icon: NOTIFICATION_INFO,
        };
    }
  }, [props.variant]);

  return (
    <SnackbarContent ref={ref as any}>
      {isSimple ? (
        <Stack
          bgcolor={computedData.bgcolor}
          borderRadius={2}
          boxShadow={'0px 2px 2px 0px #E3E3E3'}
          flexDirection={'row'}
          gap={1}
          maxWidth={528}
          minWidth={303}
          p={1.5}
          px={3}
          width={'100%'}
        >
          <Icon component={computedData.icon} sx={{ flexShrink: 0 }} />
          <Typography
            color={computedData.color}
            flex={1}
            sx={{ mt: 0.25, wordBreak: 'break-all' }}
            variant={'subtitle2'}
          >
            {props.message}
          </Typography>
          <Close
            onClick={handleDismiss}
            sx={{
              fontSize: 20,
              color: '#9095A3',
              flexShrink: 0,
              mt: 0.125,
              cursor: 'pointer',
            }}
          />
        </Stack>
      ) : (
        <Stack
          bgcolor={computedData.bgcolor}
          borderRadius={2}
          boxShadow={'0px 2px 2px 0px #E3E3E3'}
          gap={0.25}
          maxWidth={528}
          minWidth={303}
          px={3}
          py={1.5}
          width={'100%'}
        >
          <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
            <Icon component={computedData.icon} />
            <Typography
              color={computedData.color}
              flex={1}
              variant={'subtitle2'}
            >
              {props.header}
            </Typography>
            <Close
              onClick={handleDismiss}
              sx={{
                fontSize: 20,
                color: '#9095A3',
                flexShrink: 0,
                mt: 0.125,
                cursor: 'pointer',
                ml: 'auto',
              }}
            />
          </Stack>
          <Typography
            color={'#636A7C'}
            sx={{
              wordBreak: 'break-all',
            }}
            variant={'body2'}
          >
            {props.message}
          </Typography>
        </Stack>
      )}
    </SnackbarContent>
  );
});

StyledNotification.displayName = 'StyledNotification';
