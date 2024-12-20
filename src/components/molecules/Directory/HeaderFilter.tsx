import { FC, useCallback, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useAsync } from 'react-use';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';
import { useDirectoryToolbarStore } from '@/stores/directoryStores/useDirectoryToolbarStore';

import { StyledButton } from '@/components/atoms';

import { HttpError } from '@/types';

import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_FILTER_ADD from './assets/icon_filter_add.svg';
import ICON_FILTER_CLEAR from './assets/icon_filter_clear.svg';

export const HeaderFilter: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    segmentOptions,
    fetchSegmentDetails,
    selectedSegmentId,
    fetchSegmentsOptions,
    updateSelectedSegment,
    clearSegmentSelectState,
  } = useDirectoryStore((state) => state);
  const {
    createSegmentsFiltersGroup,
    clearSegmentsFiltersGroup,
    segmentsFilters,
    setOriginalSegmentsFilters,
    fromOther,
    setFromOther,
  } = useDirectoryToolbarStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectLoading, setSelectLoading] = useState(false);

  useAsync(async () => {
    if (fromOther) {
      return setFromOther(false);
    }
    if (selectedSegmentId && selectedSegmentId == -1) {
      await onClickToSelect(selectedSegmentId);
      return;
    }
    const options = await fetchSegmentsOptions();
    const target = options.filter((item) => item.isSelect);
    if (target.length > 0) {
      setOriginalSegmentsFilters(await fetchSegmentDetails(target[0].value));
    }
  }, []);

  const onClickToSelect = useCallback(
    async (id: string | number) => {
      setSelectLoading(true);

      try {
        await updateSelectedSegment(id);
        await fetchSegmentsOptions();
        setOriginalSegmentsFilters(await fetchSegmentDetails(id));
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        setAnchorEl(null);
        setSelectLoading(false);
      }
    },
    [
      updateSelectedSegment,
      fetchSegmentsOptions,
      setOriginalSegmentsFilters,
      fetchSegmentDetails,
      enqueueSnackbar,
    ],
  );

  const onClickToClearFilter = useCallback(async () => {
    clearSegmentsFiltersGroup();
    await updateSelectedSegment(-1);
    clearSegmentSelectState();
  }, [
    clearSegmentsFiltersGroup,
    updateSelectedSegment,
    clearSegmentSelectState,
  ]);

  return (
    <Stack flexDirection={'row'} gap={3}>
      <StyledButton
        color={'info'}
        disabled={segmentOptions.length === 0 || selectLoading}
        onClick={(e) => {
          if (segmentOptions.length === 0) {
            return;
          }
          setAnchorEl(e.currentTarget);
        }}
        size={'small'}
        sx={{ pl: '0 !important' }}
        variant={'text'}
      >
        {selectLoading ? (
          <Skeleton height={40} width={100} />
        ) : (
          <>
            <Typography
              color={
                segmentOptions.length === 0 ? 'text.secondary' : 'text.primary'
              }
              sx={{
                maxWidth: 240,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              variant={'body2'}
            >
              {!!selectedSegmentId && selectedSegmentId != -1
                ? (segmentOptions?.find((item) => item.isSelect)?.label ??
                  'Load segment')
                : 'Load segment'}
            </Typography>
            <Icon
              component={ICON_ARROW}
              sx={{
                width: 24,
                height: 24,
                '& > path': {
                  fill:
                    selectLoading ||
                    !selectedSegmentId ||
                    segmentOptions.length === 0 ||
                    !segmentOptions
                      ? '#9095A3'
                      : '#202939',
                },
              }}
            />
          </>
        )}
      </StyledButton>

      <Menu
        anchorEl={anchorEl}
        MenuListProps={{
          sx: {
            width: 280,
            borderRadius: 2,
          },
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        slotProps={{
          paper: {
            sx: {
              boxShadow:
                '0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
              borderRadius: 2,
              '& .MuiList-root': {
                padding: 0,
              },
            },
          },
        }}
        sx={{
          '& .MuiMenu-list': {
            p: 0,
          },
        }}
        transitionDuration={0}
      >
        {segmentOptions.map((item, index) => (
          <MenuItem
            key={`segmentOption-${index}`}
            onClick={async () => {
              await onClickToSelect(item.value);
            }}
            selected={
              parseInt(selectedSegmentId + '') > -1
                ? selectedSegmentId === item.value
                : item.isSelect
            }
            sx={{ p: '14px 24px' }}
          >
            {selectedSegmentId === item.value && selectLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Typography
                component={'div'}
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                variant={'body2'}
              >
                {item.label}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>

      {Object.keys(segmentsFilters!).length > 0 ? (
        <StyledButton
          color={'info'}
          onClick={onClickToClearFilter}
          size={'small'}
          variant={'text'}
        >
          <Icon
            component={ICON_FILTER_CLEAR}
            sx={{ width: 24, height: 24, mr: 0.75 }}
          />
          <Typography color={'text.primary'} variant={'body2'}>
            Clear filter
          </Typography>
        </StyledButton>
      ) : (
        <StyledButton
          color={'info'}
          onClick={createSegmentsFiltersGroup}
          size={'small'}
          variant={'text'}
        >
          <Icon
            component={ICON_FILTER_ADD}
            sx={{ width: 24, height: 24, mr: 0.75 }}
          />
          <Typography color={'text.primary'} variant={'body2'}>
            Add filter
          </Typography>
        </StyledButton>
      )}
    </Stack>
  );
};
