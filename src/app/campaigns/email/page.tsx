'use client';
import { Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

//import 'normalize.css';
//import 'reset.css';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Typography>Email</Typography>
    </StyledLayout>
  );
};

export default Email;
