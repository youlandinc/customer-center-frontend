'use client';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <h1>Email</h1>
    </StyledLayout>
  );
};

export default Email;
