import { FC } from 'react';
import { Drawer, Icon, Stack, Typography } from '@mui/material';

import { StyledButton } from '@/components/atoms';
import { useSwitch } from '@/hooks';

import UserIcon from './assets/icon_user.svg';

export const StyledCreateContact: FC = () => {
  const { visible, open, close } = useSwitch();
  return (
    <>
      <StyledButton
        onClick={open}
        size={'small'}
        sx={{ px: 1.5, height: 'auto !important', py: '6px' }}
        variant={'text'}
      >
        <Stack alignItems={'center'} direction={'row'} gap={'6px'}>
          <Icon component={UserIcon} sx={{ width: 24, height: 24 }} />
          <Typography color={'text.primary'} variant={'body2'}>
            Create a contact
          </Typography>
        </Stack>
      </StyledButton>
      <Drawer
        onClose={close}
        open={visible}
        anchor={'right'}
        PaperProps={{ sx: { px: 3, py: 6, minWidth: 465 } }}
      >
        <Stack gap={3} padding={3}>
          <Typography variant={'subtitle1'}>Create a contact</Typography>
          <Stack direction={'row'} gap={6} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              size={'small'}
              sx={{ width: 208 }}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton size={'small'} sx={{ width: 208 }}>
              Add contact
            </StyledButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};
