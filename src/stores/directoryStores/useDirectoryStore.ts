import { create } from 'zustand';
import { DirectoryPageMode, FilterProps, SegmentOption } from '@/types';
import { _fetchSegmentDetailsBySegmentId } from '@/request/contacts/segments';

type DirectoryStoresStates = {
  pageMode: DirectoryPageMode;
  segmentOptions: SegmentOption[];
  selectSegmentId: number | string;
};

type DirectoryStoresActions = {
  setPageMode: (mode: DirectoryPageMode) => void;
  setSegmentOptions: (options: SegmentOption[]) => void;
  fetchSegmentDetails: (id: string | number) => Promise<{
    [key: string]: Array<FilterProps & any>;
  }>;
  setSelectSegmentId: (value: number | string) => void;
};

export const useDirectoryStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>()((set) => ({
  pageMode: DirectoryPageMode.default,
  segmentOptions: [],
  selectSegmentId: '',
  setSelectSegmentId: (value) => set({ selectSegmentId: value }),
  setPageMode: (mode) => set({ pageMode: mode }),
  setSegmentOptions: (options) => set({ segmentOptions: options }),
  fetchSegmentDetails: async (id) => {
    const groupBy = (input: any[], key: string) => {
      return input.reduce((acc, currentValue) => {
        const groupKey = currentValue[key];
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
      }, {});
    };

    const { data } = await _fetchSegmentDetailsBySegmentId(id);
    return groupBy(data, 'group');
  },
}));
