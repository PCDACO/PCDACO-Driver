import { create } from 'zustand';

interface IdStore {
  id: string | null;
  setId: (id: string) => void;
  resetId: () => void;
}

export const useIdStore = create<IdStore>((set) => ({
  id: null,
  setId: (id) => set({ id }),
  resetId: () => set({ id: null }),
}));
