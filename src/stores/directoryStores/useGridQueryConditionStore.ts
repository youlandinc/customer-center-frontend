import { create } from 'zustand';
import { FilterOperationEnum, FilterProps } from '@/types';

type GridQueryConditionStoreStates = {
  segmentId?: string | number;
  segmentsFilters?: {
    [key: string | number]: FilterProps[];
  };
  originalSegmentsFilters?: {
    [key: string | number]: FilterProps[];
  };
};
type GridQueryConditionStoreActions = {
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
  segmentId: '',
  segmentsFilters: {},
  originalSegmentsFilters: {},
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
            columnName: '',
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
            columnName: '',
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
    const temp = {
      ...get().segmentsFilters,
      [index]: get().segmentsFilters![index].filter(
        (_, i) => i !== filterIndex,
      ),
    };

    if (temp[index].length === 0) {
      delete temp[index];
    }

    const result = Object.keys(temp).reduce(
      (acc, cur, i) => {
        acc[i] = temp[parseInt(cur)];
        return acc;
      },
      {} as { [key: string | number]: FilterProps[] },
    );

    set({
      segmentsFilters: result,
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
