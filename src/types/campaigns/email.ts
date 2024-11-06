export enum CampaignStatusEnum {
  draft = 'DRAFT',
  scheduled = 'SCHEDULED',
  sending = 'SENDING',
  sent = 'SENT',
  suspended = 'SUSPENDED',
  canceled = 'CANCELED',
}

export interface CampaignGridParams extends CommonGridPagination {
  sort?: CommonGridSort[];
}

export interface CommonGridPagination {
  page: number;
  size: number;
}

export interface CommonGridSort {
  direction: 'ASC' | 'DESC';
  property: string;
  ignoreCase: boolean;
  label: string;
}

export interface CampaignGridItemData {
  campaignId: 1;
  campaignName: 'test01';
  campaignStatus: CampaignStatusEnum;
  sender: string | null;
  recipients: number | null;
  sentDate: string | null;
  sentRate: number | null;
  openRate: number | null;
  openCount: number | null;
  clickRate: number | null;
  clickCount: number | null;
}

export interface CampaignGridResponse extends CommonGridPagination {
  current: number;
  total: number;
  records: CampaignGridItemData[];
}