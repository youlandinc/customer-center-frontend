import { CampaignStatusEnum } from '@/types';

export enum SetupPhaseEnum {
  sender = 'SENDER',
  recipient = 'RECIPIENT',
  subject = 'SUBJECT',
  design = 'DESIGN',
  schedule = 'SCHEDULE',
}

export interface CampaignDetailsResponse {
  campaignId: number | string;
  campaignName: CampaignStatusEnum;
  setupPhase: SetupPhaseEnum;
  campaignStatus: CampaignStatusEnum;
  data: CampaignData;
  setupPhaseStatus: {
    [key in SetupPhaseEnum]: boolean;
  };
}

export interface CampaignData {
  // sender
  name: string;
  email: string;
  recipientEmail: string;
  // recipient
  segmentId: number | string;
  markSpam: boolean;
  // subject
  subjectLine: string;
  previewText: string;
  // design
  emailTemplate: CommonUploadFile | null;
  testEmail: string;
  // schedule
  sendNow: boolean;
  scheduleTime: string | null | Date;
  recipientCount: number;
  quantity: number;
}

export interface CommonUploadFile {
  originalFileName: string;
  fileName: string;
  url: string;
  uploadTime: string;
}
