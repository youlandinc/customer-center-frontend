'use client';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { DirectoryPage } from '@/components/organisms';

//import 'normalize.css';
//import 'reset.css';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <DirectoryPage />
    </StyledLayout>
  );
};

export default Email;
