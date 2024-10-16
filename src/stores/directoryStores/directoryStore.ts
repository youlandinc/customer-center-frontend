import { GetColumnsResponse } from '@/types';
import { createStore } from 'zustand';

import { _getAllColumns } from '@/request/directory';

type DirectoryStoresStates = {} & GetColumnsResponse;

type DirectoryStoresActions = {
  getALlColumns: () => Promise<void>;
};

export const useDirectoryStore = createStore<
  DirectoryStoresStates & DirectoryStoresActions
>((set) => ({
  tableId: 0,
  tableLabel: '',
  tableName: '',
  metadataColumns: [],
  getALlColumns: async () => {
    const response = await _getAllColumns();
    const data = response.data;
    set({
      metadataColumns: data.metadataColumns,
      tableLabel: data.tableLabel,
      tableName: data.tableName,
      tableId: data.tableId,
    });
  },
}));
