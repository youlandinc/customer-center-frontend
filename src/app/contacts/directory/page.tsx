'use client';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { DirectoryPage } from '@/components/organisms';

const Directory = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <DirectoryPage />
    </StyledLayout>
  );
};

export default Directory;
