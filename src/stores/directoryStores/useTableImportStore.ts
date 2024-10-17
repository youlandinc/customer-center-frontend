import { create } from 'zustand';

export type TableImportStoreState = {
  taskId: string | number;
  fileName: string;
  fileColumns: any[];
};

export type TableImportStoreActions = {
  setTaskId: (taskId: string | number) => void;
  setFileName: (fileName: string) => void;
  setFileColumns: (columns: any[]) => void;
  reset: () => void;
};

export type TableImportStoreProps = TableImportStoreState &
  TableImportStoreActions;

export const useTableImportStore = create<TableImportStoreProps>()(
  (set, get) => ({
    taskId: '',
    fileName: '',
    fileColumns: [],
    setTaskId: (taskId: string | number) => set({ taskId }),
    setFileName: (fileName: string) => set({ fileName }),
    setFileColumns: (columns: any[]) => set({ fileColumns: columns }),
    reset: () => set({ taskId: '', fileName: '', fileColumns: [] }),
  }),
);
