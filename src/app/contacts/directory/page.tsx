'use client';
import { Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

//import 'normalize.css';
//import 'reset.css';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Typography>Directory</Typography>
    </StyledLayout>
  );
};

export default Directory;
