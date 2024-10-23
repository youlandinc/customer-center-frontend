import { create } from 'zustand';
import { FilterOperationEnum, FilterProps } from '@/types';

type GridQueryConditionStoreStates = {
  keyword?: string;
  segmentId?: string | number;
  segmentsFilters?: {
    [key: string]: FilterProps[];
  };
  originalSegmentsFilters?: {
    [key: string]: FilterProps[];
  };
};
type GridQueryConditionStoreActions = {
  setKeyword: (keyword: string) => void;
  setSegmentId: (segmentId: string | number) => void;
  addSegmentsFiltersGroup: () => void;
  createSegmentsFiltersGroup: () => void;
  clearSegmentsFiltersGroup: () => void;
  addSegmentsFilters: (index: number, data: FilterProps) => void;
  deleteSegmentsFilters: (index: number, filterIndex: number) => void;
  onChangeSegmentsFilters: (
    index: number,
    filterIndex: number,
    key: string,
    value: string | number | FilterOperationEnum,
  ) => void;
  setSegmentsFilters: (value: {
    [key: string]: Array<FilterProps & any>;
  }) => void;
  setOriginalSegmentsFilters: (value: {
    [key: string]: Array<FilterProps & any>;
  }) => void;
};

export const useGridQueryConditionStore = create<
  GridQueryConditionStoreStates & GridQueryConditionStoreActions
>((set, get) => ({
  keyword: '',
  segmentId: '',
  segmentsFilters: {},
  originalSegmentsFilters: {},
  setKeyword: (keyword) => set({ keyword }),
  setSegmentId: (segmentId) => set({ segmentId }),
  setSegmentsFilters: (value) => {
    set({ segmentsFilters: value });
  },
  setOriginalSegmentsFilters: (value) => {
    set({ originalSegmentsFilters: value, segmentsFilters: value });
  },
  createSegmentsFiltersGroup: () => {
    set({
      segmentsFilters: {
        0: [
          {
            filterId: '',
            columnId: '',
            operation: '',
            operationText: '',
          },
        ],
      },
    });
  },
  addSegmentsFiltersGroup: () => {
    const index = Object.keys(get().segmentsFilters!).length;
    set({
      segmentsFilters: {
        ...get().segmentsFilters,
        [index]: [
          {
            filterId: '',
            columnId: '',
            operation: '',
            operationText: '',
          },
        ],
      },
    });
  },
  clearSegmentsFiltersGroup: () => {
    set({ segmentsFilters: {} });
  },
  addSegmentsFilters: (index, data) => {
    set({
      segmentsFilters: {
        ...get().segmentsFilters,
        [index]: [...get().segmentsFilters![index], data],
      },
    });
  },
  deleteSegmentsFilters: (index, filterIndex) => {
    set({
      segmentsFilters: {
        ...get().segmentsFilters,
        [index]: get().segmentsFilters![index].filter(
          (_, i) => i !== filterIndex,
        ),
      },
    });
  },
  onChangeSegmentsFilters: (index, filterIndex, key, value) => {
    set({
      segmentsFilters: {
        ...get().segmentsFilters,
        [index]: get().segmentsFilters![index].map((item, i) =>
          i === filterIndex ? { ...item, [key]: value } : item,
        ),
      },
    });
  },
}));
