'use client';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { SegmentsPage } from '@/components/organisms';

const Segments = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <SegmentsPage />
    </StyledLayout>
  );
};

export default Segments;
