import { FC } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'nextjs-toploader/app';

import { useUserStore } from '@/providers';
import { ExcelUploadStatus } from '@/types';

import ICON_CLOSE from './assets/icon_close.svg';

export const XLSXUploadStatus: FC = () => {
  const router = useRouter();
  const { notificationList, deleteNotification } = useUserStore(
    (state) => state,
  );

  const onClickToDetail = (taskId: string | number) => {
    router.push(`/contacts/directory/report/${taskId}`);
  };

  return (
    <Stack
      gap={3}
      position={'fixed'}
      sx={{
        right: 48,
        bottom: 48,
      }}
      width={340}
      zIndex={999}
    >
      {notificationList.map((notification, index) => {
        switch (notification.type) {
          case ExcelUploadStatus.processing: {
            return (
              <ProgressStatus
                count={notification?.data?.count}
                key={`${notification.taskId}-${index}`}
                total={notification?.data?.total}
              />
            );
          }
          case ExcelUploadStatus.completed: {
            return (
              <CompletedStatus
                key={`${notification.taskId}-${index}`}
                newAdd={notification?.data?.newAdd}
                onClickToClose={() => deleteNotification(notification.taskId)}
                onClickToDetail={() => onClickToDetail(notification.taskId)}
                unchanged={notification?.data?.unchange}
                updated={notification?.data?.updated}
              />
            );
          }
        }
      })}
    </Stack>
  );
};

const ProgressStatus: FC<{ total: number; count: number }> = ({
  total,
  count,
}) => {
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
          {count} / {total}
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
            transition: 'width 0.3s',
          }}
          width={`${Math.ceil((count / total) * 100)}%`}
        />
      </Stack>
    </Stack>
  );
};

export const CompletedStatus: FC<{
  onClickToClose?: () => void;
  onClickToDetail?: () => void;
  newAdd: number;
  updated: number;
  unchanged: number;
}> = ({ onClickToClose, onClickToDetail, newAdd, updated, unchanged }) => {
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
        {newAdd} new - {updated} existing - {unchanged} not imported
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
