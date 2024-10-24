import { AUTO_HIDE_DURATION } from '@/constant';
import { _getAllColumns } from '@/request';
import { ColumnItem, ColumnTypeEnum, HttpError } from '@/types';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

type DirectoryStoresStates = {
  totalRecords: number;
  tableId?: number;
  loading?: boolean;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
};

type DirectoryStoresActions = {
  setTotalRecords: (total: number) => void;
  fetchAllColumns: () => Promise<void>;
  setColumn: (data: ColumnItem[]) => void;
  getPureColumn: () => {
    columnId: number | string;
    columnName: string;
    columnLabel: string;
    columnType: ColumnTypeEnum;
  }[];
  getColumnOptions: () => {
    value: number | string;
    label: string;
    key: number | string;
  }[];
};

export const useGridStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>((set, get) => ({
  totalRecords: 0,
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
  getColumnOptions: () => {
    const columns = get().metadataColumns;
    return columns.map((column) => ({
      value: column.columnName,
      label: column.columnLabel,
      key: column.columnId,
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
  setTotalRecords: (total) => {
    set({ totalRecords: total });
  },
}));
