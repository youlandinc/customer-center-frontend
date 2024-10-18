import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';
import { Icon, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { StyledButton } from '@/components/atoms';
import { DrawerNewContact } from '@/components/molecules';
import { useSwitch } from '@/hooks';

import UserIcon from './assets/icon_user.svg';

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
        <Stack alignItems={'center'} direction={'row'} gap={'6px'}>
          <Icon component={UserIcon} sx={{ width: 24, height: 24 }} />
          <Typography color={'text.primary'} variant={'body2'}>
            Create a contact
          </Typography>
        </Stack>
      </StyledButton>
      <DrawerNewContact onClose={close} open={visible} />
    </>
  );
};
