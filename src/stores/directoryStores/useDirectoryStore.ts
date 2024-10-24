import { create } from 'zustand';
import {
  DirectoryPageMode,
  FilterProps,
  HttpError,
  SegmentOption,
} from '@/types';
import {
  _fetchSegmentDetailsBySegmentId,
  _fetchSegmentOptions,
} from '@/request/contacts/segments';
import { enqueueSnackbar } from 'notistack';
import { AUTO_HIDE_DURATION } from '@/constant';

type DirectoryStoresStates = {
  pageMode: DirectoryPageMode;
  segmentOptions: SegmentOption[];
  selectSegmentId: number | string;
};

type DirectoryStoresActions = {
  setPageMode: (mode: DirectoryPageMode) => void;
  setSelectSegmentId: (value: number | string) => void;
  fetchSegmentsOptions: () => Promise<void>;
  fetchSegmentDetails: (id: string | number) => Promise<{
    [key: string]: Array<FilterProps & any>;
  }>;
};

export const useDirectoryStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>()((set) => ({
  pageMode: DirectoryPageMode.default,
  setPageMode: (mode) => set({ pageMode: mode }),

  selectSegmentId: '',
  setSelectSegmentId: (value) => set({ selectSegmentId: value }),

  segmentOptions: [],
  fetchSegmentsOptions: async () => {
    try {
      const { data } = await _fetchSegmentOptions();
      const options = data.reduce((acc, cur) => {
        if (cur) {
          acc.push({
            label: cur.segmentsName,
            key: cur.segmentsId,
            value: cur.segmentsId,
            isSelect: cur.isSelect,
          });
        }
        return acc;
      }, [] as SegmentOption[]);
      set({ segmentOptions: options });
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
