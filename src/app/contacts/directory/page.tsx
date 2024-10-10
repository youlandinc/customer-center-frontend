'use client';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

//import 'normalize.css';
//import 'reset.css';

const Directory = () => {
  const router = useRouter();
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Button onClick={() => router.back()}>back</Button>
      <Typography>Directory</Typography>
    </StyledLayout>
  );
};

export default Directory;
