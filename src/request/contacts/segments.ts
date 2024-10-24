import { del, get, post, put } from '@/request';
import { SegmentOptionResponseList, SegmentsListResponse } from '@/types';

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

export const _fetchSegmentsList = () => {
  return post<SegmentsListResponse>('/customer/segments/list', {});
};

export const _renameExistSegment = (params: {
  segmentsId: string | number;
  segmentName: string;
}) => {
  return put('/customer/segments/rename', params);
};

export const _deleteExistSegment = (segmentId: string | number) => {
  return del(`/customer/segments/delete/${segmentId}`);
};

export const _updateSelectedSegment = (params: {
  segmentId: string | number;
}) => {
  return post('/customer/user/config', params);
};
