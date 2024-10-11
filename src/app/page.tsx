'use client';
import { Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

export default function Home() {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Typography>Home</Typography>
    </StyledLayout>
  );
}
