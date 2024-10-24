import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { AUTO_HIDE_DURATION } from '@/constant';
import { _getAllColumns } from '@/request';
import { ColumnItem, HttpError } from '@/types';

type DirectoryStoresStates = {
  keyword?: string;
  totalRecords: number;
  tableId?: number;
  loading?: boolean;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
  matchColumnOptions: {
    value: number | string;
    label: string;
    key: number | string;
  }[];
  columnOptions: {
    value: number | string;
    label: string;
    key: number | string;
  }[];
};

type DirectoryStoresActions = {
  setTotalRecords: (total: number) => void;
  fetchAllColumns: () => Promise<void>;
  setColumn: (data: ColumnItem[]) => void;
  setKeyword: (keyword: string) => void;
};

export const useGridStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>((set) => ({
  totalRecords: 0,
  tableId: undefined,
  tableLabel: '',
  tableName: '',
  keyword: '',

  loading: false,
  metadataColumns: [],
  matchColumnOptions: [],
  columnOptions: [],

  setColumn: (data) => {
    set({ metadataColumns: data });
  },
  fetchAllColumns: async () => {
    try {
      set({ loading: true });
      const { data } = await _getAllColumns();
      const matchColumnOptions = data.metadataColumns.map((column) => ({
        value: column.columnId,
        label: column.columnLabel,
        key: column.columnId,
      }));

      const columnOptions = data.metadataColumns.map((column) => ({
        value: column.columnName,
        label: column.columnLabel,
        key: column.columnId,
      }));

      set({
        metadataColumns: data.metadataColumns,
        matchColumnOptions,
        columnOptions,
        tableLabel: data.tableLabel,
        tableName: data.tableName,
        tableId: data.tableId,
        loading: false,
      });
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
  setKeyword: (keyword) => set({ keyword }),
}));
