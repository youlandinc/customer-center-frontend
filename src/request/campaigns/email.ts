import { get, post } from '@/request';
import { CampaignGridParams } from '@/types';

export const _fetchCampaignsGirdData = (params: CampaignGridParams) => {
  return post('/customer/marketing/campaigns', params);
};

export const _fetchSegmentList = () => {
  return get<
    {
      segmentsId: string | number;
      segmentsName: string;
    }[]
  >('/customer/marketing/campaign/segments');
};
