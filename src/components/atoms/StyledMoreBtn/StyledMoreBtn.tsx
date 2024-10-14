import {
  StyledAnchorMenus,
  StyledButton,
  StyledDialog,
  StyledDragAndDrop,
  StyledTextField,
} from '@/components/atoms';

import { useSwitch } from '@/hooks';
import { Drawer, Icon, IconButton, Stack } from '@mui/material';
import { FC, useState } from 'react';

import AddColumn from './assets/icon_add_column.svg';
import EditColumn from './assets/icon_edit_column.svg';
import MoreIcon from './assets/icon_more.svg';

export const StyledMoreBtn: FC = () => {
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

  const column = [
    {
      id: 4706,
      field: 'loanOfficer',
      headerName: 'Loan officer',
      columnWidth: null,
      sort: 0,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4707,
      field: 'stage',
      headerName: 'Status',
      columnWidth: null,
      sort: 1,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4708,
      field: 'appraisalStage',
      headerName: 'Appraisal stage',
      columnWidth: null,
      sort: 2,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4731,
      field: 'brokerOriginationFee',
      headerName: 'Broker origination fee',
      columnWidth: null,
      sort: 25,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4732,
      field: 'brokerProcessingFee',
      headerName: 'Broker processing fee',
      columnWidth: null,
      sort: 26,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4733,
      field: 'estClosingDate',
      headerName: 'Est. closing date',
      columnWidth: null,
      sort: 27,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4734,
      field: 'broker',
      headerName: 'Referrer',
      columnWidth: null,
      sort: 28,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4735,
      field: 'channel',
      headerName: 'Source',
      columnWidth: null,
      sort: 29,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
    {
      id: 4736,
      field: 'createdAt',
      headerName: 'Submission date',
      columnWidth: null,
      sort: 30,
      visibility: true,
      pinType: 'CENTER',
      leftOrder: null,
      rightOrder: null,
    },
  ];

  return (
    <>
      <IconButton
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
        content={<StyledTextField label={'Column name'} size={'medium'} />}
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
            <StyledButton size={'small'}>Save</StyledButton>
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
        <StyledDragAndDrop list={column} />
      </Drawer>
    </>
  );
};
