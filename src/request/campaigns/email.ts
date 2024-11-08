import { get, post } from '@/request';
import { CampaignGridParams, CampaignGridResponse } from '@/types';

export const _fetchCampaignsGirdData = (params: CampaignGridParams) => {
  return post<CampaignGridResponse>('/customer/marketing/campaigns', params);
};

export const _fetchSegmentList = () => {
  return get<
    {
      segmentsId: string | number;
      segmentsName: string;
    }[]
  >('/customer/marketing/campaign/segments');
};
