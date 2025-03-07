import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth.model';
import { QueryKey } from '~/lib/query-key';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const useAuth = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();

  const loginMutation = useMutation({
    mutationKey: [QueryKey.Auth.Login],
    mutationFn: async (payload: LoginRequest) => await AuthService.login(payload),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
      ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
      router.replace('/(main)');
    },
    onError: (error) => {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    },
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.Auth.Register],
    mutationFn: async (payload: RegisterRequest) => await AuthService.register(payload),
    onError: (error) => {
      ToastAndroid.show(`${error}`, ToastAndroid.BOTTOM);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Refresh],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { loginMutation, registerMutation, refreshTokenMutation };
};
