'use client';
import { useRouter } from 'next/navigation';

import { Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

const Segments = () => {
  const router = useRouter();
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Typography>Segments</Typography>
    </StyledLayout>
  );
};

export default Segments;
