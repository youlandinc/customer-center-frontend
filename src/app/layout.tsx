'use client';
import { ReactNode, useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NProgress from 'nprogress';

import localFont from 'next/font/local';
import { Router } from 'next/router';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from '@/theme';

import '@/styles/global.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    if (localStorage && localStorage.getItem('USER_LOGIN_INFORMATION')) {
      //rootStore.injectCognitoUserSession({
      //  accessToken: localStorage.getItem('USER_LOGIN_INFORMATION') as string,
      //  refreshToken: '',
      //});
    }

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <html lang="en">
      <body className={YOULAND_FONTS.variable}>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
