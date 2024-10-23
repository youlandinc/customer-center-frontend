import { create } from 'zustand';
import { DirectoryPageMode, SegmentOption } from '@/types';

type DirectoryStoresStates = {
  pageMode: DirectoryPageMode;
  segmentOptions: SegmentOption[];
};

type DirectoryStoresActions = {
  setPageMode: (mode: DirectoryPageMode) => void;
  setSegmentOptions: (options: SegmentOption[]) => void;
};

export const useDirectoryStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>()((set) => ({
  pageMode: DirectoryPageMode.default,
  segmentOptions: [],
  setPageMode: (mode) => set({ pageMode: mode }),
  setSegmentOptions: (options) => set({ segmentOptions: options }),
}));
