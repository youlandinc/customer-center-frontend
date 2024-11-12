import { useCallback } from 'react';
import { StyledButton } from '@/components/atoms';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'nextjs-toploader/app';

import { GridSegments } from '@/components/molecules/Segments';

import ICON_CREATE_SEGMENT from './assets/icon_create_segment.svg';
import { useDirectoryToolbarStore } from '@/stores/directoryStores/useDirectoryToolbarStore';
import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';

export const SegmentsPage = () => {
  const router = useRouter();
  const { updateSelectedSegment, clearSegmentSelectState } = useDirectoryStore(
    (state) => state,
  );
  const {
    createSegmentsFiltersGroup,
    clearSegmentsFiltersGroup,
    setFromOther,
  } = useDirectoryToolbarStore((state) => state);

  const onClickToCreateSegment = useCallback(async () => {
    clearSegmentsFiltersGroup();
    await updateSelectedSegment(-1);
    clearSegmentSelectState();
    createSegmentsFiltersGroup();
    setFromOther(true);
    router.push('/contacts/directory');
    router.refresh();
  }, [
    clearSegmentSelectState,
    clearSegmentsFiltersGroup,
    createSegmentsFiltersGroup,
    router,
    setFromOther,
    updateSelectedSegment,
  ]);

  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <Stack
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h6'}>Segments</Typography>
        <StyledButton
          color={'info'}
          onClick={onClickToCreateSegment}
          size={'small'}
          variant={'text'}
        >
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
