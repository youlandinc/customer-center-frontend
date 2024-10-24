import { create } from 'zustand';

export type useGridNewContactStoreStates = {
  newGridData: Record<string, any>;
};
export type useGridNewContactStoreActions = {
  setNewGridData: (newGridData: Record<string, any>) => void;
};

export const useGridToolbarStore = create<
  useGridNewContactStoreStates & useGridNewContactStoreActions
>((set) => ({
  newGridData: {},
  setNewGridData: (newGridData) => set({ newGridData }),
}));
