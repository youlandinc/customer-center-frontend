import {
  ColumnTypeEnum,
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
  searchFilter: {
    segmentId: number;
    segmentFiler: Record<string, SearchAdditionalProp[]>;
    keyword: string;
  };
  sort: [
    {
      field: string;
      direction: SortDirection;
    },
  ];
};

type RecordsItem = {
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
    records: RecordsItem[][];
  };
};
