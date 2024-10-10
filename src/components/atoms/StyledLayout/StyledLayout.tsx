'use client';
import { FC, ReactNode, useEffect } from 'react';

import { Stack } from '@mui/material';

import { StyledLayoutHeader, StyledLayoutSide } from './index';

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
  //const store = useMst();
  //const { userSetting, session } = store;
  //const { fetchUserSetting, fetchUserLicensedProduct, initialized } =
  //  userSetting;

  //useEffect(
  //  () => {
  //    const token =
  //      session?.accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION');
  //    if (!token) {
  //      return store.logout();
  //    }
  //    if (!initialized) {
  //      fetchUserSetting();
  //      fetchUserLicensedProduct();
  //    }
  //  },
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //  [],
  //);

  return (
    <Stack height={'100vh'} minHeight={'100vh'} minWidth={1367} width={'100%'}>
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
          bgcolor={'primary.lighter'}
          height={'100%'}
          overflow={'hidden'}
          width={'100%'}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
