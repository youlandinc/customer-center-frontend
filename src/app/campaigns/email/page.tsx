'use client';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { DirectoryOverview } from '@/components/organisms';

//import 'normalize.css';
//import 'reset.css';

const Email = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <DirectoryOverview />
    </StyledLayout>
  );
};

export default Email;
