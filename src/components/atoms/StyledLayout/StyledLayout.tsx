'use client';
import { FC, ReactNode, useEffect } from 'react';

import { CircularProgress, Stack } from '@mui/material';

import { StyledLayoutHeader, StyledLayoutSide } from './index';
import { useUserStore } from '@/providers';

interface LayoutProps {
  isHomepage: boolean;
  sideMenu?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export const StyledLayout: FC<LayoutProps> = ({
  isHomepage,
  actions,
  sideMenu,
  children,
}) => {
  const { isHydration, initialized, fetchUserInfo, createSSE, sse } =
    useUserStore((state) => state);

  useEffect(
    () => {
      if (isHydration) {
        if (!sse) {
          createSSE();
        }
        if (!initialized) {
          fetchUserInfo();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isHydration, initialized],
  );

  return !isHydration || !initialized ? (
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
  ) : (
    <Stack height={'100vh'} minHeight={'100vh'} width={'100%'}>
      <StyledLayoutHeader actions={actions} isHomepage={isHomepage} />
      <Stack
        flex={1}
        flexDirection={'row'}
        height={'calc(100% - 60px)'}
        overflow={'hidden'}
        width={'100%'}
      >
        {isHomepage ? <StyledLayoutSide /> : sideMenu}
        <Stack
          bgcolor={'#FBFCFD'}
          flexShrink={0}
          height={'100%'}
          overflow={'hidden'}
          width={'calc(100% - 245px)'}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
