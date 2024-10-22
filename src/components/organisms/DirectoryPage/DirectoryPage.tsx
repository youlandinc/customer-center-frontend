import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import {
  DirectoryHeader,
  GridDirectory,
  ImportContacts,
  XLSXUploadStatus,
} from '@/components/molecules';

import { DirectoryPageMode } from '@/types';
import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';

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
