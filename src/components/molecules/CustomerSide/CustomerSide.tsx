'use client';
import { FC } from 'react';
import { Box, Icon, Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { MENU_CONFIG } from './data';

export const CustomerSide: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box
      flexShrink={0}
      overflow={'auto'}
      px={1.5}
      py={3}
      sx={{
        borderRight: '1px solid',
        borderColor: 'action.loading',
      }}
      width={245}
    >
      <Stack gap={1}>
        {MENU_CONFIG.map((item, index) => (
          <Stack gap={1} key={`${item.label}_${index}`}>
            <Typography
              border={'1px solid transparent'}
              borderRadius={3}
              component={'div'}
              gap={1}
              height={40}
              pl={2.5}
              py={1.5}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
              }}
              variant={'body2'}
            >
              <Icon component={item.icon} sx={{ width: 24, height: 24 }} />
              {item.label}
            </Typography>

            {item.children &&
              item.children.map((child, childIndex) => (
                <Typography
                  border={'1px solid transparent'}
                  borderRadius={3}
                  className={pathname === child.url ? 'active' : ''}
                  gap={1}
                  height={40}
                  key={`${item.label}_${index}_${child.label}_${childIndex}`}
                  onClick={() => router.push(child.url)}
                  pl={4}
                  py={1.5}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.background',
                      color: 'primary.contrastBackground',
                      svg: {
                        path: { fill: '#365EC6' },
                      },
                    },
                    '&.active': {
                      color: 'primary.main',
                      bgcolor: 'primary.light',
                      svg: {
                        path: { fill: '#5B76BC' },
                      },
                    },
                  }}
                  variant={'body2'}
                >
                  {child.label}
                </Typography>
              ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
