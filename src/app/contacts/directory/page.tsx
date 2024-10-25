'use client';
import dynamic from 'next/dynamic';

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

export default dynamic(() => Promise.resolve(Directory), { ssr: false });
