'use client';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { StyledLayout } from '@/components/atoms';

//import 'normalize.css';
//import 'reset.css';

const Email = () => {
  const router = useRouter();
  return (
    <StyledLayout isHomepage={false}>
      <Button onClick={() => router.back()}>back</Button>
      <Typography>Email</Typography>
    </StyledLayout>
  );
};

export default Email;
