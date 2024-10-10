'use client';
import { useRouter } from 'next/navigation';
import { Stack, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();
  return (
    <Stack>
      <Typography onClick={() => router.push('/contacts/directory')}>
        directory
      </Typography>
      <Typography onClick={() => router.push('/contacts/segments')}>
        segments
      </Typography>
    </Stack>
  );
}
