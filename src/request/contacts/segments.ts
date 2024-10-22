import { post } from '@/request';

export const _createNewSegment = (params: any) => {
  return post('/customer/segments/create', params);
};
