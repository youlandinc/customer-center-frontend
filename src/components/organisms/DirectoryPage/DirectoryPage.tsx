import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import {
  DirectoryHeader,
  GridDirectory,
  XLSXUploadStatus,
} from '@/components/molecules';
import { ImportContacts } from '@/components/organisms';
import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';
import { DirectoryPageMode } from '@/types';

export const DirectoryPage: FC = () => {
  const { pageMode } = useDirectoryStore((state) => state);

  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      {pageMode === DirectoryPageMode.default ? (
        <>
          <Stack gap={1.5}>
            <Typography variant={'h6'}>Directory</Typography>
            <DirectoryHeader />
          </Stack>
          <GridDirectory />
        </>
      ) : (
        <ImportContacts />
      )}
      <XLSXUploadStatus />
    </Stack>
  );
};
