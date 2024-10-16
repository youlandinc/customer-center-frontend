import { get, post } from '@/request/axios';
import {
  ColumnTypeEnum,
  DirectoryGridQueryCondition,
  DirectoryGridResponse,
  GetColumnsResponse,
} from '@/types';

export const _getAllColumns = () => {
  return get<GetColumnsResponse>('/customer/metadata/columns');
};

export const _getGridListById = (
  tableId: number,
  queryCondition: Partial<DirectoryGridQueryCondition>,
) => {
  return post<DirectoryGridResponse>(
    `/customer/es/records/${tableId}`,
    queryCondition,
  );
};

export const _addNewColumn = (data: {
  tableId: number;
  columnLabel: string;
  columnType: ColumnTypeEnum;
}) => {
  return post('/customer/metadata/columns', data);
};

export const _preUploadExcel = (params: FormData) => {
  return post('/customer/task/data/preview', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
