import { Box, Fade, Icon, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';

import { StyledButton } from '@/components/atoms';

import DeleteIcon from './assets/icon_grid_delete.svg';
import ExportIcon from './assets/icon_grid_export.svg';

type ExportLoanTypeProps = {
  onClose?: () => void;
  open: boolean;
  handleExport?: () => void;
  exportLoading?: boolean;
  deleteLoading?: boolean;
  disabled?: boolean;
  handleDelete?: () => void;
};

export const GridActionsCard: FC<ExportLoanTypeProps> = ({
  open,
  handleExport,
  handleDelete,
  exportLoading,
  deleteLoading,
}) => {
  const btns = [
    {
      icon: ExportIcon,
      label: 'Export',
      loading: exportLoading,
      onClick: handleExport,
    },
    {
      icon: DeleteIcon,
      label: 'Delete',
      loading: deleteLoading,
      onClick: handleDelete,
    },
  ];

  return (
    <Fade in={open}>
      <Stack
        alignItems={'center'}
        bgcolor={'background.skyBlue'}
        borderRadius={25}
        bottom={48}
        flexDirection={'row'}
        gap={3}
        left={0}
        m={'0 auto'}
        position={'fixed'}
        px={4}
        py={2}
        right={0}
        width={'fit-content'}
        zIndex={20}
      >
        {btns.map((item, index) => (
          <Fragment key={index}>
            <StyledButton
              loading={item.loading}
              onClick={item.onClick}
              sx={{
                color: 'text.white',
                p: '0 !important',
                height: 'fit-content !important',
                minWidth: 'fit-content !important',
                width: 51,
              }}
              variant={'text'}
            >
              <Stack alignItems={'center'} gap={'6px'}>
                <Icon component={item.icon} sx={{ width: 24, height: 24 }} />
                <Typography color={'text.white'} variant={'body2'}>
                  {item.label}
                </Typography>
              </Stack>
            </StyledButton>
            {index !== btns.length - 1 && (
              <Box bgcolor={'background.white'} height={25} width={'1px'}></Box>
            )}
          </Fragment>
        ))}
      </Stack>
    </Fade>
  );
};
