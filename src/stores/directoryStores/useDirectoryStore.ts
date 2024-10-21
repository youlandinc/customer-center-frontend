import { create } from 'zustand';
import { DirectoryPageMode } from '@/types';

type DirectoryStoresStates = {
  pageMode: DirectoryPageMode;
};

type DirectoryStoresActions = {
  setPageMode: (mode: DirectoryPageMode) => void;
};

export const useDirectoryStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>()((set) => ({
  pageMode: DirectoryPageMode.default,
  setPageMode: (mode) => set({ pageMode: mode }),
}));
