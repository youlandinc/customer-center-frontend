import { FC } from 'react';
import { Icon, Stack } from '@mui/material';

import { StyledButton } from '@/components/atoms';
import { CreateNewContact } from '@/components/molecules';

import ICON_UPLOAD from './assets/icon_upload.svg';

import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';
import { DirectoryPageMode } from '@/types';

export const DirectoryHeader: FC = () => {
  const { setPageMode } = useDirectoryStore((state) => state);

  return (
    <Stack flexDirection={'row'}>
      <Stack flexDirection={'row'} ml={'auto'}>
        <CreateNewContact />

        <StyledButton
          color={'info'}
          onClick={() => setPageMode(DirectoryPageMode.import)}
          size={'small'}
          sx={{
            fontWeight: '400 !important',
          }}
          variant={'text'}
        >
          <Icon
            component={ICON_UPLOAD}
            sx={{ width: 24, height: 24, mr: 0.75 }}
          />
          Import contacts
        </StyledButton>
      </Stack>
    </Stack>
  );
};
