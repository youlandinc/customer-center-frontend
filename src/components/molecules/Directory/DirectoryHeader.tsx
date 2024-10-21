import { FC } from 'react';
import { Stack } from '@mui/material';

import { CreateNewContact } from '@/components/molecules';

export const DirectoryHeader: FC = () => {
  return (
    <Stack direction={'row'}>
      <CreateNewContact />
    </Stack>
  );
};
