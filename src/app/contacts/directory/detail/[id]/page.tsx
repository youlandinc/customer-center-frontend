'use client';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';

const DataDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      {JSON.stringify(params)}
    </StyledLayout>
  );
};

export default DataDetail;
