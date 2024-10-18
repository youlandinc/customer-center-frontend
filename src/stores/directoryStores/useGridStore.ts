import { create } from 'zustand';

type DirectoryStoresStates = { totalRecords: number };

type DirectoryStoresActions = {
  setTotalRecords: (total: number) => void;
};

export const useGridStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>((set) => ({
  totalRecords: 1,
  setTotalRecords: (total) => {
    set({ totalRecords: total });
  },
}));
