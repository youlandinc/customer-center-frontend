'use client';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { ImportContacts } from '@/components/organisms';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <ImportContacts />
    </StyledLayout>
  );
};

export default Directory;
