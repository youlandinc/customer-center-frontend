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
  _updateSelectedSegment,
} from '@/request/contacts/segments';
import { enqueueSnackbar } from 'notistack';
import { AUTO_HIDE_DURATION } from '@/constant';

type DirectoryStoresStates = {
  pageMode: DirectoryPageMode;
  segmentOptions: SegmentOption[];
  selectedSegmentId: number | string;
};

type DirectoryStoresActions = {
  setPageMode: (mode: DirectoryPageMode) => void;
  setSelectedSegmentId: (value: number | string) => void;
  fetchSegmentsOptions: () => Promise<SegmentOption[]>;
  fetchSegmentDetails: (id: string | number) => Promise<{
    [key: string]: Array<FilterProps & any>;
  }>;
  updateSelectedSegment: (id: string | number) => Promise<void>;
};

export const useDirectoryStore = create<
  DirectoryStoresStates & DirectoryStoresActions
>()((set, get) => ({
  pageMode: DirectoryPageMode.default,
  setPageMode: (mode) => set({ pageMode: mode }),

  selectedSegmentId: '',
  setSelectedSegmentId: (value) => set({ selectedSegmentId: value }),

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
    return get().segmentOptions;
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
    set({ selectedSegmentId: id });
    return groupBy(data, 'group');
  },
  updateSelectedSegment: async (id) => {
    if (get().selectedSegmentId != id) {
      set({ selectedSegmentId: id });
    }
    const postData = {
      segmentId: id,
    };
    try {
      await _updateSelectedSegment(postData);
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
