import { post } from '@/request/axios';
import { SegmentsListResponse } from '@/types';

export const _fetchSegmentsList = () => {
  return post<SegmentsListResponse>('/customer/segments/list', {});
};
