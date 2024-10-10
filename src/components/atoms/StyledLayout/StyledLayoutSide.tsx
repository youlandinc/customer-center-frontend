'use client';
import { FC, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

import { LAYOUT_SIDE_MENU, ServiceType } from './index';

export const StyledLayoutSide: FC = () => {
  const pathname = usePathname();

  const menuList = useMemo(() => {
    return LAYOUT_SIDE_MENU[ServiceType.SAAS];
  }, []);

  return (
    <Box
      overflow={'auto'}
      px={2.5}
      py={5.5}
      sx={{
        borderRight: '1px solid',
        borderColor: 'action.loading',
      }}
      width={320}
    >
      <Stack gap={1}>
        {menuList.map((item, index) =>
          item.children ? (
            <Stack
              gap={1}
              key={`${item.key}_${index}`}
              pb={1}
              sx={{ borderBottom: '1px solid', borderColor: 'action.loading' }}
            >
              <Typography p={'12px 24px'} variant={'subtitle1'}>
                {item.label}
              </Typography>
              {item.children!.map((child, childIndex) => (
                <Typography
                  border={'1px solid transparent'}
                  borderRadius={3}
                  className={pathname === item.url ? 'active' : ''}
                  key={`${item.key}_${index}_${child.key}_${childIndex}`}
                  p={'12px 24px'}
                  sx={{
                    transition: 'all .3s',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.contrastBackground',
                    },
                    '&.active': {
                      color: 'primary.main',
                      bgcolor: 'primary.light',
                    },
                  }}
                  variant={'body1'}
                >
                  {child.label}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography
              border={'1px solid transparent'}
              borderRadius={3}
              className={pathname === item.url ? 'active' : ''}
              gap={1}
              key={`${item.key}_${index}`}
              p={'12px 24px'}
              sx={{
                transition: 'all .3s',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.background',
                  color: 'primary.contrastBackground',
                },
                '&.active': {
                  color: 'primary.main',
                  bgcolor: 'primary.light',
                },
              }}
              variant={'body1'}
            >
              {item.label}
            </Typography>
          ),
        )}
      </Stack>
    </Box>
  );
};
