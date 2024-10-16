import { create } from 'zustand';

type GridQueryConditionStoreStates = {
  keyword?: string;
};
type GridQueryConditionStoreActions = {
  setKeyword: (keyword: string) => void;
};

export const useGridQueryConditionStore = create<
  GridQueryConditionStoreStates & GridQueryConditionStoreActions
>((set) => ({
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
}));
