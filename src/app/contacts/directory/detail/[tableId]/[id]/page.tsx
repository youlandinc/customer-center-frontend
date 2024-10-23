'use client';
import { StyledLayout } from '@/components/atoms';
import { CustomerSide } from '@/components/molecules';
import { DirectoryOverview } from '@/components/organisms';

const DataDetail = ({
  params,
}: {
  params: { tableId: string; id: string };
}) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <DirectoryOverview id={params.id} tableId={parseInt(params.tableId)} />
    </StyledLayout>
  );
};

export default DataDetail;