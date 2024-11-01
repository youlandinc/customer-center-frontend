import { FC, useState } from 'react';
import { Drawer, Icon, IconButton, Stack } from '@mui/material';
import { useAsyncFn } from 'react-use';
import { useSnackbar } from 'notistack';

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

import { _addNewColumn, _sortColumn } from '@/request';
import { ColumnTypeEnum, HttpError, SortColumnItem } from '@/types';

import ICON_ADD from './assets/icon_add_column.svg';
import ICON_EDIT_COLUMN from './assets/icon_edit_column.svg';
import ICON_MORE from './assets/icon_more.svg';

export const GridMoreBtn: FC = () => {
  const { tableId, metadataColumns, setColumn } = useGridStore(
    (state) => state,
  );
  const { enqueueSnackbar } = useSnackbar();
  const { visible, open, close } = useSwitch();
  const {
    visible: dialogShow,
    open: dialogOpen,
    close: dialogClose,
  } = useSwitch();

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
  ];
  /*
   * {
   id: 4706,
   field: 'loanOfficer',
   headerName: 'Loan officer',
   columnWidth: null,
   sort: 0,
   visibility: true,
   pinType: 'CENTER',
   leftOrder: null,
   rightOrder: null,
   },*/
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
    </>
  );
};
