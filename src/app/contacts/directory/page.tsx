'use client';
import { Stack, Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide, XLSXUpload } from '@/components/molecules';

//import 'normalize.css';
//import 'reset.css';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Stack height={'100%'} p={6} width={'100%'}>
        <Typography>Directory</Typography>
        <XLSXUpload />
      </Stack>
    </StyledLayout>
  );
};

export default Directory;
