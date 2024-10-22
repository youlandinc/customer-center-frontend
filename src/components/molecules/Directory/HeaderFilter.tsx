import { FC, useState } from 'react';
import { Icon, Stack, Typography } from '@mui/material';

import { NotUndefined } from '@/utils';
import { StyledAnchorMenus, StyledButton } from '@/components/atoms';

import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';

import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_FILTER_ADD from './assets/icon_filter_add.svg';
import ICON_FILTER_CLEAR from './assets/icon_filter_clear.svg';

export const HeaderFilter: FC = () => {
  const {
    createSegmentsFiltersGroup,
    clearSegmentsFiltersGroup,
    segmentsFilters,
  } = useGridQueryConditionStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <Stack flexDirection={'row'} gap={3}>
      <StyledButton
        color={'info'}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size={'small'}
        sx={{ px: '0 !important' }}
        variant={'text'}
      >
        <Typography color={'text.primary'} variant={'body2'}>
          Load segment
        </Typography>
        <Icon component={ICON_ARROW} sx={{ width: 24, height: 24, ml: 0.75 }} />
      </StyledButton>

      <StyledAnchorMenus
        anchorEl={anchorEl}
        MenuListProps={{
          sx: {
            width: anchorEl && anchorEl.offsetWidth,
            borderRadius: 2,
          },
        }}
        menus={[
          {
            label: '123',
          },
        ]}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
      />
      {NotUndefined(segmentsFilters) &&
      Object.keys(segmentsFilters!).length > 0 ? (
        <StyledButton
          color={'info'}
          onClick={clearSegmentsFiltersGroup}
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
