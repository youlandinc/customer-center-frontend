import { Drawer, Icon, IconButton, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { useAsyncFn } from 'react-use';

import {
  StyledAnchorMenus,
  StyledButton,
  StyledDialog,
  StyledDragAndDrop,
  StyledTextField,
} from '@/components/atoms';
import { useSwitch } from '@/hooks';

import { AUTO_HIDE_DURATION } from '@/constant';
import { _addNewColumn } from '@/request';
import { ColumnTypeEnum, HttpError } from '@/types';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

import AddColumn from './assets/icon_add_column.svg';
import EditColumn from './assets/icon_edit_column.svg';
import MoreIcon from './assets/icon_more.svg';

export const GridMoreBtn: FC = () => {
  const { tableId, metadataColumns, updateColumn } = useGridColumnsStore(
    (state) => state,
  );

  const [columnName, setColumnName] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { visible, open, close } = useSwitch();

  const {
    visible: dialogShow,
    open: dialogOpen,
    close: dialogClose,
  } = useSwitch();

  const menus = [
    {
      label: 'Edit columns',
      icon: EditColumn,
      handleClick: () => {
        setAnchorEl(null);
        open();
      },
    },
    {
      label: 'Add new column',
      icon: AddColumn,
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
  const column = metadataColumns.map((item, index) => ({
    id: item.columnId,
    field: item.columnName,
    headerName: item.columnLabel,
    columnWidth: null,
    sort: index,
    visibility: true,
    pinType: 'CENTER',
    leftOrder: null,
    rightOrder: null,
  }));

  const [state, addNewColumn] = useAsyncFn(
    async (columnName: string) => {
      try {
        const res = await _addNewColumn({
          tableId: tableId as number,
          columnLabel: columnName,
          columnType: ColumnTypeEnum.text,
        });
        updateColumn(res.data.metadataColumns);
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

  return (
    <>
      <IconButton
        disabled={!metadataColumns.length}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{ p: 0 }}
      >
        <Icon component={MoreIcon} sx={{ width: 24, height: 24 }} />
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
            value={columnName}
          />
        }
        footer={
          <Stack direction={'row'} gap={1.5} justifyContent={'center'}>
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
        <StyledDragAndDrop list={column as any} />
      </Drawer>
    </>
  );
};
