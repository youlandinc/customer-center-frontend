'use client';
import { useRouter } from 'next/navigation';

import { Button, Typography } from '@mui/material';

const Segments = () => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.back()}>back</Button>
      <Typography>
        <h1>Segments</h1>
      </Typography>
    </>
  );
};

export default Segments;
