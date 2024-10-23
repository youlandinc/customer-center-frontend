import { create } from 'zustand';

type DirectoryStoresStates = { totalRecords: number };

type DirectoryStoresActions = {
  setTotalRecords: (total: number) => void;
};

export const useGridStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>((set) => ({
  totalRecords: 0,
  setTotalRecords: (total) => {
    set({ totalRecords: total });
  },
}));
