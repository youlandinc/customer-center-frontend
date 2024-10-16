import { FC, useRef } from 'react';
import { Stack, Typography } from '@mui/material';

import { StyledSearchTextField } from '@/components/atoms';
import { GridMoreBtn } from '@/components/molecules';

type GridToolBarProps = {
  tableId: number;
};

export const GridToolBar: FC<GridToolBarProps> = ({ tableId }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Stack
        direction={'row'}
        gap={3}
        justifyContent={'space-between'}
        mb={1.5}
        width={'100%'}
      >
        <Typography variant={'subtitle1'}>74,0281 Contacts</Typography>
        <Stack alignItems={'center'} direction={'row'} gap={3}>
          <StyledSearchTextField
            // handleClear={() => {
            //   propertyAddressRef.current!.value = '';
            //   updateQueryDebounce('keyword', '');
            // }}
            inputRef={ref}
            // onChange={(e) => {
            //   updateQueryDebounce('keyword', e.target.value);
            // }}
            variant={'outlined'}
          />
          <GridMoreBtn />
        </Stack>
      </Stack>
    </>
  );
};
