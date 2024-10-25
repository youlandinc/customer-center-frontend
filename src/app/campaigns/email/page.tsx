'use client';
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
