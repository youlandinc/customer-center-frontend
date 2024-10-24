import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { AUTO_HIDE_DURATION } from '@/constant';
import { _getAllColumns } from '@/request';
import { ColumnItem, ColumnTypeEnum, HttpError } from '@/types';

type DirectoryStoresStates = {
  totalRecords: number;
  tableId?: number;
  loading?: boolean;
  tableLabel: string;
  tableName: string;
  metadataColumns: ColumnItem[];
  pureColumns: {
    columnId: ColumnItem['columnId'];
    columnName: ColumnItem['columnName'];
    columnLabel: ColumnItem['columnLabel'];
    columnType: ColumnTypeEnum;
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
};

export const useGridStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>((set) => ({
  totalRecords: 0,
  tableId: undefined,
  tableLabel: '',
  tableName: '',

  loading: false,
  metadataColumns: [],
  pureColumns: [],
  columnOptions: [],

  setColumn: (data) => {
    set({ metadataColumns: data });
  },
  fetchAllColumns: async () => {
    try {
      set({ loading: true });
      const { data } = await _getAllColumns();
      const pureColumns = data.metadataColumns.map((column) => ({
        columnId: column.columnId,
        columnName: column.columnName,
        columnLabel: column.columnLabel,
        columnType: column.columnType,
      }));

      const columnOptions = data.metadataColumns.map((column) => ({
        value: column.columnName,
        label: column.columnLabel,
        key: column.columnId,
      }));

      set({
        metadataColumns: data.metadataColumns,
        pureColumns,
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
}));
