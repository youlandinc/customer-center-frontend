import { createStore } from 'zustand';

export const useDirectoryStores = createStore((set) => ({
  directory: [],
}));
