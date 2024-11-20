import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { StyledButton } from '@/components/atoms';

export const XLSXUploadHeader: FC<{ backStep: () => void }> = ({
  backStep,
}) => {
  return (
    <>
      <Stack alignItems={'center'} flexDirection={'row'} gap={3}>
        <Typography variant={'h6'}>Import contacts</Typography>

        <StyledButton
          color={'info'}
          onClick={backStep}
          size={'small'}
          sx={{ ml: 'auto' }}
          variant={'outlined'}
        >
          Cancel import
        </StyledButton>
      </Stack>
    </>
  );
};
