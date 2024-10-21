'use client';
import { StyledLayout } from '@/components/atoms';
import {
  CustomerSide,
  XLSXUploadReportDetail,
  XLSXUploadStatus,
} from '@/components/molecules';

const ReportDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <XLSXUploadReportDetail id={params.slug} />
      <XLSXUploadStatus />
    </StyledLayout>
  );
};

export default ReportDetail;
