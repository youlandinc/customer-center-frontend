import { del, get, post, put } from '@/request/axios';
import {
  AddContactRequestParam,
  ColumnTypeEnum,
  DirectoryGridQueryCondition,
  DirectoryGridResponse,
  GetColumnsResponse,
  HttpVariant,
  SortColumnParam,
  ValidateColumnData,
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

export const _addNewContact = (param: AddContactRequestParam) => {
  return post('http://192.168.1.102:8080/customer/es/record', param);
};

export const _sortColumn = (param: SortColumnParam) => {
  return put('http://192.168.1.102:8080/customer/metadata/columns', param);
};

export const _deleteGridRecords = (param: {
  tableId: number;
  recordIds: string[];
}) => {
  return del('http://192.168.1.102:8080/customer/es/record', { data: param });
};

export const _exportGridRecords = (records: string[]) => {
  return post('http://192.168.1.102:8080/customer/es/export', { records });
};

export const _validateColumnData = (param: ValidateColumnData) => {
  return post<{ errorMessage: string; recordId: string; variant: HttpVariant }>(
    'http://192.168.1.102:8080/customer/es/record/check',
    param,
  );
};

export const _fetchAllContacts = () => {
  return get<number>('http://192.168.1.102:8080/customer/es/record/total');
};

export const _preUploadExcel = (params: FormData) => {
  return post<PreUploadExcelResponse>('/customer/task/data/preview', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
