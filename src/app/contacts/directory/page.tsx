'use client';
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
