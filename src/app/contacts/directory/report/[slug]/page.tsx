'use client';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CustomerSide, XLSXUploadReportDetail } from '@/components/molecules';

const ReportDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <XLSXUploadReportDetail id={params.slug} />
    </StyledLayout>
  );
};

export default ReportDetail;
