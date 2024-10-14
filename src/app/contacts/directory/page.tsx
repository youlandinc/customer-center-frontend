'use client';
import { Stack } from '@mui/material';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { ImportContacts } from '@/components/organisms';

//import 'normalize.css';
//import 'reset.css';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <Stack height={'100%'} p={6} width={'100%'}>
        <ImportContacts />
      </Stack>
    </StyledLayout>
  );
};

export default Directory;
