import { Icon, Typography } from '@mui/material';
import { FC } from 'react';

import { StyledButton } from '@/components/atoms';
import { DrawerNewContact } from '@/components/molecules';
import { useSwitch } from '@/hooks';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

import ICON_USER from './assets/icon_user.svg';

export const CreateNewContact: FC = () => {
  const { metadataColumns } = useGridColumnsStore((state) => state);

  const { visible, open, close } = useSwitch();

  return (
    <>
      <StyledButton
        disabled={!metadataColumns.length}
        onClick={open}
        size={'small'}
        sx={{ px: 1.5, height: 'auto !important', py: '6px' }}
        variant={'text'}
      >
        <Icon component={ICON_USER} sx={{ width: 24, height: 24, mr: 0.75 }} />
        <Typography color={'text.primary'} variant={'body2'}>
          Create a contact
        </Typography>
      </StyledButton>
      <DrawerNewContact onClose={close} open={visible} />
    </>
  );
};
