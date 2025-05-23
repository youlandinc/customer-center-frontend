import { create } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import {
  CampaignData,
  CampaignStatusEnum,
  HttpError,
  SetupPhaseEnum,
} from '@/types';
import {
  _fetchCampaignDetails,
  _fetchSegmentList,
  _redirectCampaignStepPhase,
  _updateCampaign,
} from '@/request';

export type CampaignEditStoreStates = {
  _campaignId: string | number | undefined;
  isFetching: boolean;
  isUpdating: boolean;
  isRedirecting: boolean;
  campaignName: string;
  setupPhase: SetupPhaseEnum;
  setupPhaseStatus: {
    [key in SetupPhaseEnum]: boolean;
  };
  campaignData: CampaignData;
  campaignStatus: CampaignStatusEnum;
  segmentList: Option[];
};

export type CampaignEditStoreActions = {
  fetchSegmentList: () => Promise<void>;
  fetchCampaignDetails: (
    campaignId: string | number,
    cb: () => void,
    isShowLoading?: boolean,
  ) => Promise<void>;
  updateCampaignId: (id: string | number) => void;
  updateCampaignName: (name: string) => void;
  updateSetupPhase: (phase: SetupPhaseEnum) => void;
  updateFieldValue: (
    field: keyof CampaignData,
    value: CampaignData[keyof CampaignData],
  ) => void;
  resetCampaignEditStore: () => void;
  updateToServer: (postData: any) => Promise<{ success: boolean }>;
  redirectCampaignStepPhase: ({
    campaignId,
    nextSetupPhase,
    isShowLoading,
  }: {
    campaignId: string | number;
    nextSetupPhase: SetupPhaseEnum;
    isShowLoading?: boolean;
  }) => Promise<void>;
  updateCampaignStatus: (status: CampaignStatusEnum) => void;
};

const INITIAL_CAMPAIGN_DATA: CampaignData = {
  name: '',
  email: '',
  recipientEmail: '',
  // recipient
  segmentId: '',
  markSpam: false,
  // subject
  subjectLine: '',
  previewText: '',
  // design
  emailTemplate: null,
  testEmail: '',
  // schedule
  sendNow: false,
  scheduleTime: null,
  recipientCount: 0,
  quantity: 0,
};

export const useCampaignEditStore = create<
  CampaignEditStoreStates & CampaignEditStoreActions
>((set, get) => ({
  isFetching: false,
  _campaignId: undefined,
  campaignName: '',
  isRedirecting: false,
  setupPhase: SetupPhaseEnum.sender,
  campaignData: INITIAL_CAMPAIGN_DATA,
  isUpdating: false,
  segmentList: [],
  campaignStatus: CampaignStatusEnum.draft,
  setupPhaseStatus: {
    [SetupPhaseEnum.sender]: false,
    [SetupPhaseEnum.recipient]: false,
    [SetupPhaseEnum.subject]: false,
    [SetupPhaseEnum.design]: false,
    [SetupPhaseEnum.schedule]: false,
  },
  fetchCampaignDetails: async (campaignId, cb, isShowLoading = true) => {
    set({ _campaignId: campaignId });
    if (isShowLoading) {
      set({ isFetching: true });
    }
    if (!campaignId) {
      return cb();
    }
    try {
      const {
        data: {
          data: {
            // sender
            name = '',
            email = '',
            recipientEmail = '',
            // recipient
            segmentId = '',
            markSpam = false,
            // subject
            subjectLine = '',
            previewText = '',
            // design
            emailTemplate = null,
            testEmail = '',
            // schedule
            sendNow = true,
            scheduleTime = null,
            recipientCount = 0,
            quantity = 0,
          },
          setupPhase,
          campaignName,
          campaignStatus,
          setupPhaseStatus,
        },
      } = await _fetchCampaignDetails(campaignId);
      set({
        campaignData: {
          // sender
          name,
          email,
          recipientEmail,
          // recipient
          segmentId,
          markSpam,
          // subject
          subjectLine,
          previewText,
          // design
          emailTemplate,
          testEmail,
          // schedule
          sendNow,
          scheduleTime,
          recipientCount,
          quantity,
        },
        setupPhase,
        campaignName,
        campaignStatus,
        setupPhaseStatus,
      });
      await _fetchSegmentList();
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
      return cb();
    } finally {
      set({ isUpdating: false, isRedirecting: false, isFetching: false });
    }
  },
  updateCampaignId: (id) => set({ _campaignId: id }),
  updateCampaignName: (name) => set({ campaignName: name }),
  updateSetupPhase: (phase) => set({ setupPhase: phase }),
  updateFieldValue: (field, value) => {
    set((state) => ({
      campaignData: {
        ...state.campaignData,
        [field]: value,
      },
    }));
  },
  updateToServer: async (postData) => {
    set({ isUpdating: true, isRedirecting: false });
    try {
      const { data } = await _updateCampaign(postData);
      get().updateSetupPhase(postData.nextSetupPhase);
      set({ setupPhaseStatus: data });
      return { success: true };
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
      return { success: false };
    } finally {
      set({ isUpdating: false, isRedirecting: false, isFetching: false });
    }
  },
  redirectCampaignStepPhase: async ({
    campaignId,
    nextSetupPhase,
    isShowLoading = true,
  }) => {
    if (!campaignId) {
      return;
    }
    if (isShowLoading) {
      set({ isRedirecting: true });
    }
    try {
      const { data } = await _redirectCampaignStepPhase({
        campaignId,
        nextSetupPhase,
      });
      get().updateSetupPhase(nextSetupPhase);
      set({ setupPhaseStatus: data });
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
    set({ isUpdating: false, isRedirecting: false, isFetching: false });
  },
  fetchSegmentList: async () => {
    try {
      const { data } = await _fetchSegmentList();
      const list = data.map((item) => ({
        label: item.segmentsName,
        value: item.segmentsId,
        key: item.segmentsId,
      }));
      set({ segmentList: list });
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
  },
  updateCampaignStatus: (status) => set({ campaignStatus: status }),
  resetCampaignEditStore: () =>
    set({
      _campaignId: undefined,
      campaignName: '',
      setupPhase: SetupPhaseEnum.sender,
      campaignData: INITIAL_CAMPAIGN_DATA,
      isFetching: false,
      isUpdating: false,
      isRedirecting: false,
    }),
}));
