'use client';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CampaignMarketing, CustomerSide } from '@/components/molecules';

const EmailMarketingReport = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <CampaignMarketing campaignId={params.slug} />
    </StyledLayout>
  );
};

export default EmailMarketingReport;
