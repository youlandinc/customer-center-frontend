import { StyledSelectPopup } from '@/components/atoms';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

export const XLSXMatchColumn = () => {
  const { metadataColumns } = useGridColumnsStore();
  const [x, setX] = useState('');

  return (
    <>
      <Stack width={320}>
        <StyledSelectPopup
          id={'match-select'}
          label={''}
          labelId={'match-select-label'}
          onChange={(e: any) => {
            setX(e.target.value as any);
          }}
          options={[{ value: '1', label: 'First Name' }]}
          value={x}
        />
      </Stack>
    </>
  );
};
