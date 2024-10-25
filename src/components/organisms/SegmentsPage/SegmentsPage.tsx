'use client';
import { Stack, Typography } from '@mui/material';

import { GridSegments } from '@/components/molecules/Segments';

export const SegmentsPage = () => {
  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <Stack flexDirection={'row'}>
        <Typography variant={'h6'}>Segments</Typography>
      </Stack>
      <GridSegments />
    </Stack>
  );
};
