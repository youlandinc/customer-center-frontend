'use client';
import dynamic from 'next/dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide, XLSXUploadReportDetail } from '@/components/molecules';

const ReportDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <XLSXUploadReportDetail id={params.slug} />
    </StyledLayout>
  );
};

export default dynamic(() => Promise.resolve(ReportDetail), { ssr: false });
