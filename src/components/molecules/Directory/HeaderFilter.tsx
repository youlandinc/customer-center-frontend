import { FC, useCallback, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useAsync } from 'react-use';
import { useSnackbar } from 'notistack';
import { useSearchParams } from 'next/navigation';

import { NotUndefined } from '@/utils';
import { StyledButton } from '@/components/atoms';

import { _fetchSegmentOptions } from '@/request/contacts/segments';

import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';
import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';

import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_FILTER_ADD from './assets/icon_filter_add.svg';
import ICON_FILTER_CLEAR from './assets/icon_filter_clear.svg';

import { HttpError, SegmentOption } from '@/types';
import { AUTO_HIDE_DURATION } from '@/constant';
import { _updateUserConfig } from '@/request';

export const HeaderFilter: FC = () => {
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const {
    createSegmentsFiltersGroup,
    clearSegmentsFiltersGroup,
    segmentsFilters,
    setOriginalSegmentsFilters,
  } = useGridQueryConditionStore((state) => state);
  const {
    setSegmentOptions,
    segmentOptions,
    fetchSegmentDetails,
    setSelectSegmentId,
    selectSegmentId,
  } = useDirectoryStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectLoading, setSelectLoading] = useState(false);

  useAsync(async () => {
    if (
      searchParams.get('segmentId') &&
      searchParams.get('segmentId') !== selectSegmentId
    ) {
      await onClickToSelect(searchParams.get('segmentId')!);
      return;
    }
    await fetchOptions();
  }, []);

  const fetchOptions = useCallback(async () => {
    try {
      const { data } = await _fetchSegmentOptions();
      const options = data.reduce((acc, cur) => {
        if (cur) {
          acc.push({
            label: cur.segmentsName,
            key: cur.segmentsId,
            value: cur.segmentsId,
            isSelect: cur.isSelect,
          });
        }
        return acc;
      }, [] as SegmentOption[]);
      setSegmentOptions(options);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
  }, [enqueueSnackbar, setSegmentOptions]);

  const onClickToSelect = useCallback(
    async (id: string | number) => {
      const postData = {
        segmentId: id,
      };
      setSelectSegmentId(id);
      setSelectLoading(true);

      try {
        await _updateUserConfig(postData);
        await fetchOptions();
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
      enqueueSnackbar,
      fetchOptions,
      fetchSegmentDetails,
      setOriginalSegmentsFilters,
      setSelectSegmentId,
    ],
  );

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
        <Typography color={'text.primary'} variant={'body2'}>
          {segmentOptions?.find((item) => item.value == selectSegmentId)
            ?.label || 'Load segment'}
        </Typography>
        <Icon component={ICON_ARROW} sx={{ width: 24, height: 24, ml: 0.75 }} />
      </StyledButton>

      <Menu
        anchorEl={anchorEl}
        MenuListProps={{
          sx: {
            width:
              anchorEl && anchorEl.offsetWidth > 140
                ? anchorEl.offsetWidth
                : 140,
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
      >
        {segmentOptions.map((item, index) => (
          <MenuItem
            key={`segmentOption-${index}`}
            onClick={async () => {
              await onClickToSelect(item.value);
            }}
            selected={
              parseInt(selectSegmentId + '') > -1
                ? selectSegmentId === item.value
                : item.isSelect
            }
            sx={{ p: '14px 24px' }}
          >
            {selectSegmentId === item.value && selectLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Typography component={'div'} variant={'body2'}>
                {item.label}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>

      {NotUndefined(segmentsFilters) &&
      Object.keys(segmentsFilters!).length > 0 ? (
        <StyledButton
          color={'info'}
          onClick={() => {
            clearSegmentsFiltersGroup();
            setSelectSegmentId('');
          }}
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
