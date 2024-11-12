'use client';
export const fetchCache = 'force-no-store';
//export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import dynamic from 'next/dynamic';
import { CircularProgress, Stack } from '@mui/material';

import { useUserStore } from '@/providers';

import { SystemLogout } from '@/utils';

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { accessToken, setAccessToken, isHydration, loginSystem, isAuth } =
    useUserStore((state) => state);

  useEffect(
    () => {
      if (!isHydration) {
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
        return SystemLogout();
      }

      setAccessToken(token);

      loginSystem(() => router.push('/'));
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [isHydration],
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

//export default SignIn;
export default dynamic(() => Promise.resolve(SignIn), { ssr: false });
