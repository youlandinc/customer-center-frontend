'use client';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import NextTopLoader from 'nextjs-toploader';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { Inter } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from '@/theme';

import '@/styles/global.css';

import { SnackbarProvider } from 'notistack';
import { UserStoreProvider } from '@/providers';

import { useBreakpoints } from '@/hooks';
import { StyledNotification } from '@/components/atoms';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <title>Customer Center</title>
      <body className={inter.variable}>
        <NextTopLoader
          color="#D2D6E1"
          crawl={true}
          height={2}
          shadow={'none'}
        />
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          </LocalizationProvider>
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
