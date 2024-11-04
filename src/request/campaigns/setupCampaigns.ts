import { del, get, post, put } from '@/request';
import { CampaignDetailsResponse, SetupPhaseEnum } from '@/types';

export const _createCampaign = (params: { campaignName: string }) => {
  return post('/customer/marketing/campaign', params);
};

export const _fetchCampaignDetails = (campaignId: number | string) => {
  return get<CampaignDetailsResponse>(
    `/customer/marketing/campaign/${campaignId}`,
  );
};

export const _redirectCampaignStepPhase = (params: {
  campaignId: number | string;
  nextSetupPhase: SetupPhaseEnum;
}) => {
  return put('/customer/marketing/campaign/redirect', params);
};

export const _updateCampaign = (params: {
  campaignId: number | string;
  setupPhase: SetupPhaseEnum;
  nextSetupPhase: SetupPhaseEnum;
  data: any;
}) => {
  return put('/customer/marketing/campaign', params);
};

export const _cancelScheduleCampaign = (campaignId: number | string) => {
  return post(`/customer/marketing/campaign/${campaignId}`);
};

export const _uploadCampaignTemplate = (params: {
  campaignId: string | number;
  formData: FormData;
}) => {
  return post(
    `/customer/marketing/campaign/template/${params.campaignId}`,
    params.formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const _deleteCampaignTemplate = (campaignId: number | string) => {
  return del(`/customer/marketing/campaign/template/${campaignId}`);
};

export const _testCampaignTemplate = (params: {
  campaignId: string | number;
  email: string;
}) => {
  return post('/customer/marketing/campaign/email/test', params);
};
