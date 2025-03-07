import { create } from 'zustand';

interface ApiStore {
  endpoints: string[];
  addEndpoint: (key: 'register' | 'license' | 'image') => void;
  removeEndpoint: (key: 'register' | 'license' | 'image') => void;
  resetEndpoints: () => void;
  hasEndpoint: (key: 'register' | 'license' | 'image') => boolean;
}

export const useApiStore = create<ApiStore>((set, get) => ({
  endpoints: ['register', 'license', 'image'],

  addEndpoint: (key) =>
    set((state) => ({
      endpoints: state.endpoints.includes(key) ? state.endpoints : [...state.endpoints, key],
    })),

  removeEndpoint: (key) =>
    set((state) => ({
      endpoints: state.endpoints.filter((endpoint) => endpoint !== key),
    })),

  resetEndpoints: () => set({ endpoints: ['register', 'license', 'image'] }),

  hasEndpoint: (key) => get().endpoints.includes(key),
}));
