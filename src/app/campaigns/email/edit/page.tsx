'use client';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { StyledLayout } from '@/components/atoms';
import { CampaignCreate, CustomerSide } from '@/components/molecules';

const EmailCampaignsEdit = () => {
  return (
    <StyledLayout isHomepage={false} sideMenu={<CustomerSide />}>
      <CampaignCreate />
    </StyledLayout>
  );
};

export default EmailCampaignsEdit;
