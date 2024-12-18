import { FC, useCallback, useState } from 'react';
import {
  CircularProgress,
  Drawer,
  Icon,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'nextjs-toploader/app';
import { useAsyncFn } from 'react-use';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';

import { useSwitch } from '@/hooks';

import { AUTO_HIDE_DURATION } from '@/constant';

import { useGridStore } from '@/stores/directoryStores/useGridStore';

import {
  StyledAnchorMenus,
  StyledButton,
  StyledDialog,
  StyledDragAndDrop,
  StyledTextField,
} from '@/components/atoms';

import { _addNewColumn, _fetchImportHistories, _sortColumn } from '@/request';
import {
  ColumnTypeEnum,
  ExcelUploadHistory,
  HttpError,
  SortColumnItem,
} from '@/types';

import ICON_ADD from './assets/icon_add_column.svg';
import ICON_EDIT_COLUMN from './assets/icon_edit_column.svg';
import ICON_MORE from './assets/icon_more.svg';
import ICON_VIEW_HISTORY from './assets/icon_view_history.svg';
import ICON_CLOSE from '@/components/molecules/XLSXUpload/assets/icon_close.svg';

export const GridMoreBtn: FC = () => {
  const { tableId, metadataColumns, setColumn } = useGridStore(
    (state) => state,
  );
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { visible, open, close } = useSwitch();
  const {
    visible: dialogShow,
    open: dialogOpen,
    close: dialogClose,
  } = useSwitch();
  const {
    open: historyOpen,
    close: historyClose,
    visible: historyVisible,
  } = useSwitch(false);

  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<ExcelUploadHistory[]>([]);

  const [columnName, setColumnName] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menus = [
    {
      label: 'Edit columns',
      icon: ICON_EDIT_COLUMN,
      handleClick: () => {
        setAnchorEl(null);
        open();
      },
    },
    {
      label: 'Add new column',
      icon: ICON_ADD,
      handleClick: () => {
        setAnchorEl(null);
        dialogOpen();
      },
    },
    {
      label: 'View import history',
      icon: ICON_VIEW_HISTORY,
      handleClick: async () => {
        setAnchorEl(null);
        await onClickToOpenDrawer();
      },
    },
  ];

  const column = metadataColumns
    .filter((item) => item.columnName !== 'id')
    .map((item, index) => ({
      field: item.columnName,
      label: item.columnLabel,
      sort: index,
      visibility: item.active,
      id: item.columnId,
      disabled: item.columnName === 'email_address',
    }));

  const [state, addNewColumn] = useAsyncFn(
    async (columnName: string) => {
      try {
        const res = await _addNewColumn({
          tableId: tableId as number,
          columnLabel: columnName,
          columnType: ColumnTypeEnum.text,
        });
        setColumn(res.data.metadataColumns);
        dialogClose();
        setColumnName('');
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      }
    },
    [tableId],
  );

  const onClickToOpenDrawer = useCallback(async () => {
    historyOpen();
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
  }, [enqueueSnackbar, historyOpen]);

  const onClickToDetail = useCallback(
    (id: string | number) => {
      if (!id) {
        return;
      }
      router.push(`/contacts/directory/report/${id}`, {});
    },
    [router],
  );

  const [sortState, sortColumn] = useAsyncFn(
    async (column: SortColumnItem[]) => {
      try {
        const res = await _sortColumn({
          tableId: tableId as number,
          columns: column,
        });
        close();
        setColumn(res.data.metadataColumns);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      }
    },
    [tableId],
  );

  return (
    <>
      <IconButton
        disabled={!metadataColumns.length}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{ p: 0 }}
      >
        <Icon component={ICON_MORE} sx={{ width: 24, height: 24 }} />
      </IconButton>
      <StyledAnchorMenus
        anchorEl={anchorEl}
        menus={menus}
        onClose={() => {
          setAnchorEl(null);
        }}
        open={Boolean(anchorEl)}
      />
      <StyledDialog
        content={
          <StyledTextField
            label={'Column name'}
            onChange={(e) => {
              setColumnName(e.target.value);
            }}
            size={'medium'}
            sx={{ my: 2 }}
            value={columnName}
          />
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={dialogClose}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              loading={state.loading}
              onClick={async () => {
                await addNewColumn(columnName);
              }}
              size={'small'}
            >
              Save
            </StyledButton>
          </Stack>
        }
        header={'Add new column'}
        onClose={dialogClose}
        open={dialogShow}
      />
      <Drawer
        anchor={'right'}
        onClose={close}
        open={visible}
        PaperProps={{ sx: { px: 3, py: 6, minWidth: 465 } }}
      >
        <StyledDragAndDrop
          handleCancel={close}
          handleSave={async (columns) => {
            const result: SortColumnItem[] = columns.map((item) => ({
              columnId: item.id,
              columnName: item.field,
              active: item.visibility,
            }));
            await sortColumn(result);
          }}
          list={column}
          loading={sortState.loading}
        />
      </Drawer>

      <Drawer anchor={'right'} onClose={historyClose} open={historyVisible}>
        <Stack flexDirection={'row'} pt={6} px={3} width={560}>
          <Typography variant={'subtitle1'}>History</Typography>
          <Icon
            component={ICON_CLOSE}
            onClick={historyClose}
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
