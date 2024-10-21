import { create } from 'zustand';
import {
  ExcelColumnMappingProps,
  ExcelContentProps,
  ExcelHeaderProps,
} from '@/types';

export type TableImportStoreState = {
  taskId: string | number;
  fileName: string;
  fileColumns: ExcelHeaderProps[];
  fileContent: ExcelContentProps[];
  columnMappingList: ExcelColumnMappingProps[];
};

export type TableImportStoreActions = {
  setTaskId: (taskId: string | number) => void;
  setFileName: (fileName: string) => void;
  setFileColumns: (columns: ExcelHeaderProps[]) => void;
  setFileContent: (content: ExcelContentProps[]) => void;
  setColumnMappingList: (mappingList: ExcelColumnMappingProps[]) => void;
  reset: () => void;
};

export type TableImportStoreProps = TableImportStoreState &
  TableImportStoreActions;

export const useTableImportStore = create<TableImportStoreProps>()((set) => ({
  taskId: '',
  fileName: '',
  fileColumns: [],
  fileContent: [],
  columnMappingList: [],
  setTaskId: (taskId) => set({ taskId }),
  setFileName: (fileName) => set({ fileName }),
  setFileColumns: (columns) => set({ fileColumns: columns }),
  setFileContent: (content) => set({ fileContent: content }),
  setColumnMappingList: (mappingList) =>
    set({ columnMappingList: mappingList }),
  reset: () =>
    set({
      taskId: '',
      fileName: '',
      fileColumns: [],
      fileContent: [],
      columnMappingList: [],
    }),
}));
