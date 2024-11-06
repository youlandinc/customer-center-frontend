import { get, put } from '@/request';
import { MarketingReportResponseData } from '@/types/campaigns/marketingReport';

export const _fetchMarketingReportData = (campaignId: string | number) => {
  return get<MarketingReportResponseData>(
    `/customer/marketing/campaign/performance/${campaignId}`,
  );
};

export const _updateCampaignState = (params: {
  campaignId: string | number;
  active: boolean;
}) => {
  return put(
    `/customer/marketing/campaign/${params.campaignId}`,
    {},
    {
      params: {
        active: params.active,
      },
    },
  );
};
