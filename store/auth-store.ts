// stores/useAuthStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth.service';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isLogged: false,

      setTokens: async (accessToken, refreshToken) => {
        await storage.setItem('accessToken', accessToken);
        await storage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken, isLogged: true });
      },

      logout: async () => {
        await storage.removeItem('accessToken');
        await storage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, isLogged: false });
        router.replace('/(auth)/login');
      },

      refetchToken: async () => {
        const { accessToken, refreshToken, logout, setTokens } = get();

        if (!accessToken || !refreshToken) {
          router.replace('/(auth)/login');
          return;
        }

        try {
          const validate = await AuthService.validationToken()
            .then((data) => {
              return data;
            })
            .catch((error) => {
              logout();
              return error;
            });

          if (validate === undefined) {
            console.log('Token is invalid');
            await logout();
            return;
          }

          if (validate.status === 401) {
            const response = await AuthService.refreshToken(refreshToken)
              .then((data) => data)
              .catch((error) => error);
            if (response.status === 401) {
              console.log('Refresh token failed', response);
              await logout();
              return;
            } else {
              console.log('Refresh token success');
              await setTokens(response.accessToken, response.refreshToken);
              return;
            }
          }

          if (validate.status === 200) {
            console.log('Token is still valid');
          }
        } catch (error) {
          console.error('Error while refreshing token:', error);
          await logout();
        }
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
