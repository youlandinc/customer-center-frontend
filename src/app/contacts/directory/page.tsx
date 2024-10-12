'use client';
import { Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide, UploadXLSX } from '@/components/molecules';

//import 'normalize.css';
//import 'reset.css';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Typography>Directory</Typography>
      <UploadXLSX />
    </StyledLayout>
  );
};

export default Directory;
