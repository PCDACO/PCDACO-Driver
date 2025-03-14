import { create } from 'zustand';

interface ApiStore {
  endpoints: string[];
  addEndpoint: (key: string) => void;
  removeEndpoint: (key: string) => void;
  resetEndpoints: () => void;
  hasEndpoint: (key: string | string[]) => boolean;
}

export const useApiStore = create<ApiStore>((set, get) => ({
  endpoints: [],

  addEndpoint: (key) =>
    set((state) => ({
      endpoints: state.endpoints.includes(key) ? state.endpoints : [...state.endpoints, key],
    })),

  removeEndpoint: (key) =>
    set((state) => ({
      endpoints: state.endpoints.filter((endpoint) => endpoint !== key),
    })),

  resetEndpoints: () => set({ endpoints: [] }),

  hasEndpoint: (key) => {
    if (Array.isArray(key)) {
      return key.every((k) => get().endpoints.includes(k));
    }
    return get().endpoints.includes(key);
  },
}));
