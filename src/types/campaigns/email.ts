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
