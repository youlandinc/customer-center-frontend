import { CampaignStatusEnum } from '@/types';

export interface MarketingReportBaseInfo {
  sentOn: string;
  subject: string;
  from: string;
}

export enum MarketingReportProcessStatusEnum {
  scheduled = 'SCHEDULED',
  completed = 'COMPLETED',
}

export interface MarketingReportTimeline {
  status: MarketingReportProcessStatusEnum;
  startTime: string | null;
  endTime: string;
  total: number | null;
  dayDone: number | null;
  quantity: number | null;
  sent: number | null;
  unsent: number | null;
}

export interface MarketingReportDeliveryStatistics {
  sentTo: number;
  deliveredTo: number;
  deliveryRate: number;
  softBounces: number;
  hardBounces: number;
}

export interface MarketingReportOpenStatistics {
  estimatedOpens: number;
  trackableOpens: number;
  uniqueOpens: number;
  uniqueOpenRate: number;
  totalOpens: number;
  averageTimeToOpen: number;
  unTrackableContacts: number;
}

export interface MarketingReportClickStatistics {
  lastClick: string;
  totalClicks: number;
  uniqueClicks: number;
  clickThoughRate: number;
  clickToOpenRate: number;
  averageTimeToClick: number;
}

export interface MarketingReportUnsubscribeStatistics {
  unsubscribes: number;
  unsubscribeRate: number;
  spamComplaints: number;
  spamComplaintRate: number;
}

export interface MarketingReportResponseData {
  campaignName: string;
  campaignId: string;
  campaignStatus: CampaignStatusEnum;
  info: MarketingReportBaseInfo;
  timeline: MarketingReportTimeline[];
  performance: {
    deliveryStatistics: MarketingReportDeliveryStatistics;
    openStatistics: MarketingReportOpenStatistics;
    clickStatistics: MarketingReportClickStatistics;
    unsubscribesStatistics: MarketingReportUnsubscribeStatistics;
  };
}
