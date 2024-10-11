'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useUserStore } from '@/providers';
import { URL_LOGOUT_REDIRECTION } from '@/components/atoms';

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accessToken, setAccessToken, initialized, loginSystem, isAuth } =
    useUserStore((state) => state);

  useEffect(
    () => {
      if (!initialized) {
        return;
      }

      if (isAuth) {
        return router.push('/');
      }

      const token =
        searchParams.get('token') ||
        accessToken ||
        localStorage.getItem('USER_LOGIN_INFORMATION');

      if (!token) {
        localStorage.clear();
        window.location.href = URL_LOGOUT_REDIRECTION;
        return;
      }

      setAccessToken(token);

      loginSystem(() => router.push('/'));
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [initialized],
  );

  return (
    <Stack
      alignItems={'center'}
      height={'100vh'}
      justifyContent={'center'}
      margin={'auto 0'}
      minHeight={'calc(667px - 46px)'}
      width={'100vw'}
    >
      <CircularProgress
        sx={{
          width: 24,
          height: 24,
          background: 'background.white',
          color: 'action.loading',
        }}
      />
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(SignIn), { ssr: false });
