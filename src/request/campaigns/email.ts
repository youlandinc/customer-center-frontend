import { del, get, post, put } from '@/request';
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

export const _deleteCampaign = (campaignId: string | number) => {
  return del(`/customer/marketing/campaign/${campaignId}`);
};

export const _renameCampaign = (params: {
  campaignId: string | number;
  campaignName: string;
}) => {
  return put(`/customer/marketing/campaign/name/${params.campaignId}`, {
    campaignName: params.campaignName,
  });
};
