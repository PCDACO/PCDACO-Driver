import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth.service';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  removeTokens: () => Promise<void>;
  refetchToken: () => Promise<void>;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: async (accessToken, refreshToken) => {
        await storage.setItem('accessToken', accessToken);
        await storage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      removeTokens: async () => {
        await storage.removeItem('accessToken');
        await storage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      refetchToken: async () => {
        const oldRefreshToken = get().refreshToken;
        if (!oldRefreshToken) return;

        await AuthService.refreshToken(oldRefreshToken)
          .then((response) => {
            set({
              accessToken: response.value.accessToken,
              refreshToken: response.value.refreshToken,
              isAuthenticated: true,
            });
          })
          .catch(() => {
            get().removeTokens();
          });
      },

      validateToken: async () => {
        await AuthService.validationToken()
          .then(() => {
            set({
              isAuthenticated: true,
              accessToken: get().accessToken,
              refreshToken: get().refreshToken,
            });
          })
          .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
              get().refetchToken();
            } else {
              get().removeTokens();
            }
          });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('onRehydrateStorage', state);
      },
    }
  )
);
