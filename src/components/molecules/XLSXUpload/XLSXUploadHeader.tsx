import { FC, useCallback, useState } from 'react';
import {
  CircularProgress,
  Drawer,
  Icon,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';

import { useSwitch } from '@/hooks';
import { AUTO_HIDE_DURATION } from '@/constant';

import { _fetchImportHistories } from '@/request';
import { ExcelUploadHistory, HttpError } from '@/types';

import { StyledButton } from '@/components/atoms';

import ICON_CLOSE from './assets/icon_close.svg';

export const XLSXUploadHeader: FC<{ backStep: () => void }> = ({
  backStep,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { open, close, visible } = useSwitch(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<ExcelUploadHistory[]>([]);

  const onClickToOpenDrawer = useCallback(async () => {
    open();
    setLoading(true);
    try {
      const { data } = await _fetchImportHistories();
      setHistories(data);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, open]);

  const onClickToDetail = useCallback(
    (id: string | number) => {
      if (!id) {
        return;
      }
      router.push(`/contacts/directory/report/${id}`, {});
    },
    [router],
  );

  return (
    <>
      <Stack alignItems={'center'} flexDirection={'row'} gap={3}>
        <Typography variant={'h6'}>Import contacts</Typography>

        <Typography
          color={'primary.main'}
          onClick={onClickToOpenDrawer}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          variant={'body2'}
        >
          View history
        </Typography>

        <StyledButton
          color={'info'}
          onClick={backStep}
          size={'small'}
          sx={{ ml: 'auto' }}
          variant={'outlined'}
        >
          Cancel import
        </StyledButton>
      </Stack>

      <Drawer anchor={'right'} onClose={close} open={visible}>
        <Stack flexDirection={'row'} pt={6} px={3} width={560}>
          <Typography variant={'subtitle1'}>History</Typography>
          <Icon
            component={ICON_CLOSE}
            onClick={close}
            sx={{ width: 24, height: 24, ml: 'auto', cursor: 'pointer' }}
          />
        </Stack>
        <Stack flex={1} overflow={'auto'} pb={6} px={3} width={560}>
          {loading ? (
            <Stack alignItems={'center'} flex={1} justifyContent={'center'}>
              <CircularProgress />
            </Stack>
          ) : (
            histories.map((history, index) => (
              <Stack
                borderBottom={'1px solid #D2D6E1'}
                gap={3}
                key={`history-${index}`}
                py={3}
                sx={{
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Typography variant={'subtitle2'}>
                  {format(new Date(history.importDate), 'MM/dd/yyyy')}
                </Typography>
                <Typography component={'div'} variant={'body2'}>
                  [{histories.length - index}]&nbsp;Import completed of your
                  contacts, Import made by&nbsp;{history.importUser}&nbsp;via
                  Platform using IP address&nbsp;
                  {history.ipAddress}.&nbsp;Check the detailed report{' '}
                  <Typography
                    color={'#2B52B6'}
                    component={'span'}
                    onClick={() => onClickToDetail(history.id)}
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    variant={'body2'}
                  >
                    here
                  </Typography>
                  .
                </Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Drawer>
    </>
  );
};
