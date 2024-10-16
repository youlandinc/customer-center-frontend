import { FC } from 'react';
import { Stack } from '@mui/material';

import { CreateNewContact, GridDirectory } from '@/components/molecules';

export const DirectoryOverview: FC = () => {
  return (
    <Stack gap={3}>
      <CreateNewContact />
      <GridDirectory />
    </Stack>
  );
};
