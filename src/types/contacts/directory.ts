import {
  ColumnTypeEnum,
  FilterOperationEnum,
  SearchOperationEnum,
  SortDirection,
} from '@/types/enums';

export type ColumnItem = {
  columnId: number;
  tenantId: string;
  tableId: number;
  columnLabel: string;
  columnName: string;
  columnType: ColumnTypeEnum;
  custom: string;
  active: boolean;
  unique: boolean;
  notNull: boolean;
  description: string;
  csn: number;
};

export type GetColumnsResponse = {
  tableId: number;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
};

type SearchAdditionalProp = {
  filterId: number;
  columnId: number;
  columnName: string;
  operation: SearchOperationEnum;
  operationText: string;
};

export type DirectoryGridQueryCondition = {
  page: number;
  size: number;
  searchFilter: Partial<{
    segmentId: number;
    segmentFiler: Record<string, SearchAdditionalProp[]>;
    keyword: string;
  }>;
  sort: [
    {
      field: string;
      direction: SortDirection;
    },
  ];
};

export type RecordsItem = {
  columnId: number;
  columnLabel: string;
  columnName: string;
  columnType: string;
  columnValue: string;
};

export type DirectoryGridResponse = {
  tableId: number;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
  metadataValues: {
    total: number;
    size: number;
    current: number;
    pages: number;
    records: RecordsItem[][];
  };
  totalRecords: number;
};

export type GridColumnItem = {
  id: number;
  field: string;
  label: string;
  sort: number;
  visibility: boolean;
  disabled?: boolean;
};

export type RecordItem = {
  columnId: number;
  columnName: string;
  columnValue: unknown;
};

export type AddContactRequestParam = {
  tableId: number;
  record: RecordItem[];
};

export type SortColumnItem = {
  columnId: number;
  columnName: string;
  active: boolean;
};

export type SortColumnParam = {
  tableId: number;
  columns: SortColumnItem[];
};

export type ValidateColumnData = {
  columnId: number;
  columnName: string;
  columnValue: unknown;
  tableId: number;
};

export enum DirectoryPageMode {
  default = 'DEFAULT',
  import = 'IMPORT',
}

export interface FilterProps {
  filterId: string | number;
  columnId?: string | number;
  operation?: FilterOperationEnum | string;
  operationText?: string;
}

export interface SegmentOptionResponseData {
  isSelect: boolean;
  segmentsId: number;
  segmentsName: string;
}

export type SegmentOptionResponseList = SegmentOptionResponseData[];

export interface SegmentOption extends Option {
  isSelect: boolean;
}
