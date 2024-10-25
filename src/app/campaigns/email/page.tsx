'use client';
import dynamic from 'next/dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <h1>Email</h1>
    </StyledLayout>
  );
};

export default dynamic(() => Promise.resolve(Email), { ssr: false });
