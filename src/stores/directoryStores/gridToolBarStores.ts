import { createStore } from 'zustand';

import { ColumnPiningDirectionEnum } from '@/types';

export type GridColumnItem = {
  columnWidth: number | null;
  field: string;
  headerName: string;
  // id: maybe(number),
  leftOrder: number | null;
  pinType: ColumnPiningDirectionEnum | null;
  sort: number;
  visibility: boolean;
};

export type GridToolBarState = {
  gridColumn: GridColumnItem[];
};

export const useGridToolBarStores = createStore<GridToolBarState>((set) => ({
  gridColumn: [],
}));
