import { GetColumnsResponse } from '@/types';
import { create } from 'zustand';

import { _getAllColumns } from '@/request/directory';

type ColumnsStoreStates = Omit<GetColumnsResponse, 'tableId'> & {
  tableId?: number;
};

type ColumnsStoreStoresActions = {
  getALlColumns: () => Promise<void>;
};

export const useDirectoryColumnsStore = create<
  ColumnsStoreStates & ColumnsStoreStoresActions
>((set) => ({
  tableId: undefined,
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
