import { Stack } from '@mui/material';
import { FC } from 'react';

import {
  CreateNewContact,
  GridDirectory,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

export const DirectoryOverview: FC = () => {
  return (
    <Stack gap={3}>
      <CreateNewContact />
      <GridToolBar />
      <GridDirectory />
    </Stack>
  );
};
