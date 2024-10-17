import {
  ColumnPiningDirectionEnum,
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

export type GridColumnItem = {
  columnWidth: number | null;
  field: string;
  headerName: string;
  // id: maybe(number),
  leftOrder: number | null;
  pinType: ColumnPiningDirectionEnum | null;
  sort: number;
  visibility: boolean;
};

export type AddContactRequestParam = {
  tableId: number;
  record: {
    columnId: number;
    columnName: string;
    columnValue: unknown;
  }[];
};
