import { AUTO_HIDE_DURATION } from '@/constant';

import { create } from 'zustand';
import { enqueueSnackbar } from 'notistack';

import { _getAllColumns } from '@/request/directory';
import { GetColumnsResponse, HttpError } from '@/types';

type ColumnsStoreStates = Omit<GetColumnsResponse, 'tableId'> & {
  tableId?: number;
  loading?: boolean;
};

type ColumnsStoreStoresActions = {
  getALlColumns: () => Promise<void>;
};

export const useDirectoryGridColumnsStore = create<
  ColumnsStoreStates & ColumnsStoreStoresActions
>((set) => ({
  tableId: undefined,
  tableLabel: '',
  tableName: '',
  metadataColumns: [],
  loading: false,
  getALlColumns: async () => {
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
