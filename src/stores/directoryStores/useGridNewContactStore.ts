import { create } from 'zustand';

export type useGridNewContactStoreStates = {
  data: Record<string, any>;
};
export type useGridNewContactStoreActions = {
  setNewContact: (data: Record<string, any>) => void;
};

export const useGridNewContactStore = create<
  useGridNewContactStoreStates & useGridNewContactStoreActions
>((set) => ({
  data: {},
  setNewContact: (data) => set({ data }),
}));
