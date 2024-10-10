'use client';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

export default function Home() {
  const router = useRouter();
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Button onClick={() => router.back()}>back</Button>
      <Typography>Home</Typography>
    </StyledLayout>
  );
}
