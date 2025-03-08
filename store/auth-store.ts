import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '~/lib/storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  removeTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _) => ({
      accessToken: null,
      refreshToken: null,
      isLogged: false,

      setTokens: async (accessToken, refreshToken) => {
        await storage.setItem('accessToken', accessToken);
        await storage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken, isLogged: true });
      },

      removeTokens: async () => {
        await storage.removeItem('accessToken');
        await storage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, isLogged: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('onRehydrateStorage', state);
      },
    } // Lưu vào AsyncStorage
  )
);
