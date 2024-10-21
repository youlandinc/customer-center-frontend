'use client';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import localFont from 'next/font/local';
import Script from 'next/script';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from '@/theme';

import '@/styles/global.css';

import { SnackbarProvider } from 'notistack';
import { UserStoreProvider } from '@/providers';

import { useBreakpoints } from '@/hooks';
import { StyledNotification } from '@/components/atoms';

const YOULAND_FONTS = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Poppins-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Poppins-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Poppins-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const breakpoints = useBreakpoints();

  return (
    <html lang="en">
      <body className={YOULAND_FONTS.variable}>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: ['sm', 'xs'].includes(breakpoints)
                  ? 'center'
                  : 'right',
              }}
              Components={{
                success: StyledNotification,
                error: StyledNotification,
                default: StyledNotification,
                info: StyledNotification,
                warning: StyledNotification,
              }}
              maxSnack={3}
            >
              <UserStoreProvider>{children}</UserStoreProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbKnoaYuPycOQD4uQdPrc1nESFEVRH5-g&libraries=places,streetView,maps"
        type="text/javascript"
      />
    </html>
  );
};

export default RootLayout;
//export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
