import { StyledButton } from '@/components/atoms';
import { Icon, Stack, Typography } from '@mui/material';

import { GridSegments } from '@/components/molecules/Segments';

import ICON_CREATE_SEGMENT from './assets/icon_create_segment.svg';

export const SegmentsPage = () => {
  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <Stack
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h6'}>Segments</Typography>
        <StyledButton color={'info'} size={'small'} variant={'text'}>
          <Stack alignItems={'center'} flexDirection={'row'} gap={'6px'}>
            <Icon
              component={ICON_CREATE_SEGMENT}
              sx={{ width: 24, height: 24 }}
            />
            <Typography color={'text.primary'} variant={'body2'}>
              Create a segment
            </Typography>
          </Stack>
        </StyledButton>
      </Stack>
      <GridSegments />
    </Stack>
  );
};
