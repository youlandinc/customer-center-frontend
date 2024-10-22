import { get, post, put } from '@/request';
import { SegmentOptionResponseList } from '@/types';

export const _createNewSegment = (params: any) => {
  return post('/customer/segments/create', params);
};

export const _updateExistSegment = (params: any) => {
  return put('/customer/segments/update', params);
};

export const _fetchSegmentOptions = () => {
  return get<SegmentOptionResponseList>('/customer/segments/options');
};

export const _fetchSegmentDetailsBySegmentId = (segmentId: string | number) => {
  return get(`/customer/segments/detail/${segmentId}`);
};
