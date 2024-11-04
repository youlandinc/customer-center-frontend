'use client';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CampaignEdit, CustomerSide } from '@/components/molecules';

const EmailCampaignsEdit = ({ params }: { params: { slug: string } }) => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <CampaignEdit campaignId={params.slug} />
    </StyledLayout>
  );
};

export default EmailCampaignsEdit;
