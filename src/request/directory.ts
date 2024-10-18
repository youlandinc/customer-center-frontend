import { get, post } from '@/request/axios';
import {
  ColumnTypeEnum,
  DirectoryGridQueryCondition,
  DirectoryGridResponse,
  ExcelColumnMappingProps,
  ExcelMergeStrategyProps,
  ExcelUploadHistory,
  ExcelUploadHistoryDetailResponse,
  GetColumnsResponse,
} from '@/types';
import { PreUploadExcelResponse } from '@/types/contacts';

export const _getAllColumns = () => {
  return get<GetColumnsResponse>(
    'http://192.168.1.102:8080/customer/metadata/columns',
  );
};

export const _getGridListById = (
  tableId: number,
  queryCondition: Partial<DirectoryGridQueryCondition>,
) => {
  return post<DirectoryGridResponse>(
    `http://192.168.1.102:8080/customer/es/records/${tableId}`,
    queryCondition,
  );
};

export const _addNewColumn = (data: {
  tableId: number;
  columnLabel: string;
  columnType: ColumnTypeEnum;
}) => {
  return post<GetColumnsResponse>(
    'http://192.168.1.102:8080/customer/metadata/columns',
    data,
  );
};

export const _preUploadExcel = (params: FormData) => {
  return post<PreUploadExcelResponse>('/customer/task/data/preview', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const _startImportExcel = (params: {
  taskId: PreUploadExcelResponse['taskId'];
  columnMappingList: ExcelColumnMappingProps[];
  mergeStrategy: ExcelMergeStrategyProps;
}) => {
  return post('/customer/task/execute', params);
};

export const _fetchImportHistories = () => {
  return get<ExcelUploadHistory[]>('/customer/task/list');
};

export const _fetchImportHistoriesDetail = (id: string | number) => {
  return get<ExcelUploadHistoryDetailResponse>(`/customer/task/detail/${id}`);
};

export const _fetchImportHistoryInvalidExcel = (id: string | number) => {
  return post(
    `/customer/task/download/invalid/${id}`,
    {},
    {
      responseType: 'blob',
    },
  );
};
