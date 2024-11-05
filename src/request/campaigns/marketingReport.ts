import { get } from '@/request';
import { MarketingReportResponseData } from '@/types/campaigns/marketingReport';

export const _fetchMarketingReportData = (campaignId: string | number) => {
  return get<MarketingReportResponseData>(
    `/customer/marketing/campaign/performance/${campaignId}`,
  );
};
