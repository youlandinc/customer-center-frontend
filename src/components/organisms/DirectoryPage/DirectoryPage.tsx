import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { DirectoryHeader, GridDirectory } from '@/components/molecules';

export const DirectoryPage: FC = () => {
  return (
    <Stack gap={4} height={'100%'} px={8} py={6}>
      <Stack gap={1.5}>
        <Typography variant={'h6'}>Directory</Typography>
        <DirectoryHeader />
      </Stack>
      <GridDirectory />
    </Stack>
  );
};
