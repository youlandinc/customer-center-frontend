'use client';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { EmailPage } from '@/components/organisms';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <EmailPage />
    </StyledLayout>
  );
};

export default Email;
