import { create } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import { _getAllColumns } from '@/request/directory';
import { ColumnItem, ColumnTypeEnum, HttpError } from '@/types';

export type ColumnsStoreStates = {
  tableId?: number;
  loading?: boolean;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
};

type ColumnsStoreStoresActions = {
  fetchAllColumns: () => Promise<void>;
  setColumn: (data: ColumnItem[]) => void;
  getPureColumn: () => {
    columnId: number | string;
    columnName: string;
    columnLabel: string;
    columnType: ColumnTypeEnum;
  }[];
};

export const useGridColumnsStore = create<
  ColumnsStoreStates & ColumnsStoreStoresActions
>((set, get) => ({
  tableId: undefined,
  tableLabel: '',
  tableName: '',
  metadataColumns: [],
  loading: false,
  getPureColumn: () => {
    const columns = get().metadataColumns;
    return columns.map((column) => ({
      columnId: column.columnId,
      columnName: column.columnName,
      columnLabel: column.columnLabel,
      columnType: column.columnType,
    }));
  },
  setColumn: (data) => {
    set({ metadataColumns: data });
  },
  fetchAllColumns: async () => {
    try {
      set({ loading: true });
      const response = await _getAllColumns();
      const data = response.data;
      set({
        metadataColumns: data.metadataColumns,
        tableLabel: data.tableLabel,
        tableName: data.tableName,
        tableId: data.tableId,
      });
      set({ loading: false });
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
  },
}));