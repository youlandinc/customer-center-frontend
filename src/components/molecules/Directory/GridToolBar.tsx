import { useGridQueryConditionStore } from '@/stores/directoryStores/gridQueryConditionStore';
import { FC, useRef } from 'react';
import { Stack, Typography } from '@mui/material';

import { useDebounceFn } from '@/hooks';
import { StyledTextFieldSearch } from '@/components/atoms';
import { GridMoreBtn } from '@/components/molecules';

type GridToolBarProps = {
  totalContacts: number;
};

export const GridToolBar: FC<GridToolBarProps> = ({ totalContacts }) => {
  const { setKeyword } = useGridQueryConditionStore((state) => state);

  const ref = useRef<HTMLInputElement | null>(null);

  const [, , updateQueryDebounce] = useDebounceFn(setKeyword, 500);

  return (
    <>
      <Stack
        direction={'row'}
        gap={3}
        justifyContent={'space-between'}
        mb={1.5}
        width={'100%'}
      >
        <Typography variant={'subtitle1'}>
          {totalContacts.toLocaleString()} Contacts
        </Typography>
        <Stack alignItems={'center'} direction={'row'} gap={3}>
          <StyledTextFieldSearch
            handleClear={() => {
              ref.current!.value = '';
              updateQueryDebounce('');
            }}
            inputRef={ref}
            onChange={(e) => {
              updateQueryDebounce(e.target.value);
            }}
            variant={'outlined'}
          />
          <GridMoreBtn />
        </Stack>
      </Stack>
    </>
  );
};
