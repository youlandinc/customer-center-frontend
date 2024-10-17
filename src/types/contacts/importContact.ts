export interface ExcelHeaderProps {
  columnLabel: string;
  columnName: string;
}

export interface ExcelContentProps {
  [key: string]: string | number | null | undefined;
}

export interface PreUploadExcelResponse {
  taskId: string | number;
  fileName: string;
  header: ExcelHeaderProps[];
  content: ExcelContentProps[];
}
