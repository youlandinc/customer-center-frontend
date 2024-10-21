import { FC } from 'react';
import { Icon, Stack, Typography } from '@mui/material';

import ICON_CLOSE from './assets/icon_close.svg';

export const XLSXUploadStatus: FC = () => {
  return (
    <Stack
      gap={3}
      position={'fixed'}
      sx={{
        right: 48,
        bottom: 48,
      }}
      width={340}
      zIndex={9999}
    >
      <ProgressStatus />
      <CompletedStatus />
    </Stack>
  );
};

const ProgressStatus = () => {
  return (
    <Stack
      alignItems={'center'}
      bgcolor={'#fff'}
      borderRadius={3}
      gap={2}
      p={3}
      sx={{
        boxShadow:
          '0px 0px 2px 0px rgba(17, 52, 227, 0.10), 0px 10px 10px 0px rgba(17, 52, 227, 0.10)',
      }}
      width={'100%'}
    >
      <Stack flexDirection={'row'} width={'100%'}>
        <Typography variant={'subtitle1'}>Importing contacts</Typography>
        <Typography ml={'auto'} variant={'body2'}>
          180 / 343
        </Typography>
      </Stack>

      <Stack
        bgcolor={'#D6E2FF'}
        borderRadius={1}
        height={4}
        position={'relative'}
        width={'100%'}
      >
        <Stack
          bgcolor={'#5B76BC'}
          borderRadius={1}
          height={4}
          position={'absolute'}
          sx={{
            top: 0,
            left: 0,
          }}
          width={'80%'}
        />
      </Stack>
    </Stack>
  );
};

export const CompletedStatus: FC<{
  onClickToClose?: () => void;
  onClickToDetail?: () => void;
}> = ({ onClickToClose, onClickToDetail }) => {
  return (
    <Stack
      alignItems={'center'}
      bgcolor={'#fff'}
      borderRadius={3}
      gap={1.5}
      p={3}
      sx={{
        boxShadow:
          '0px 0px 2px 0px rgba(17, 52, 227, 0.10), 0px 10px 10px 0px rgba(17, 52, 227, 0.10)',
      }}
      width={'100%'}
    >
      <Stack
        borderBottom={'1px solid #D2D6E1'}
        flexDirection={'row'}
        pb={1.5}
        width={'100%'}
      >
        <Typography variant={'subtitle1'}>Completed</Typography>
        <Icon
          component={ICON_CLOSE}
          onClick={onClickToClose}
          sx={{
            width: 20,
            height: 20,
            ml: 'auto',
            cursor: 'pointer',
          }}
        />
      </Stack>

      <Typography flexWrap={'wrap'} variant={'body2'} width={'100%'}>
        160 new - 1 existing - 3 not imported 160
      </Typography>

      <Typography
        color={'#365EC6'}
        onClick={onClickToDetail}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        variant={'body3'}
        width={'100%'}
      >
        See import report
      </Typography>
    </Stack>
  );
};
