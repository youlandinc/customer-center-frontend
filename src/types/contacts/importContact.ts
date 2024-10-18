export interface ExcelHeaderProps {
  columnLabel: string;
  columnName: string;
}

export interface ExcelContentProps {
  [key: string]: string | number | null | undefined;
}

export interface ExcelColumnMappingProps {
  columnName: string;
  executeColumnId: number | string;
}

export interface PreUploadExcelResponse {
  taskId: string | number;
  fileName: string;
  header: ExcelHeaderProps[];
  content: ExcelContentProps[];
}

export enum ExcelMergeStrategyProps {
  overwrite = 'OVERWRITE',
  update = 'UPDATE',
}

export interface ExcelUploadHistory {
  ipAddress: string;
  importUser: string;
  importDate: string;
  id: number | string;
  importFileName: string;
}

export interface ExcelUploadHistoryDetailResponse extends ExcelUploadHistory {
  header: ExcelHeaderProps[];
  content: ExcelContentProps[];
  invalidContacts: number;
  newContacts: number;
  updatedContacts: number;
  unchangedContacts: number;
  importedContacts: number;
}
