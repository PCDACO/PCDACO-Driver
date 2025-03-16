import { useMutation } from '@tanstack/react-query';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth.model';
import { QueryKey } from '~/lib/query-key';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const useAuth = () => {
  const { setTokens, setIsAuthenticated, removeTokens, refreshToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationKey: [QueryKey.Auth.Login],
    mutationFn: async (payload: LoginRequest) => await AuthService.login(payload),
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.Auth.Register],
    mutationFn: async (payload: RegisterRequest) => await AuthService.register(payload),
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Refresh],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      removeTokens();
      setIsAuthenticated(false);
      console.error(error);
    },
  });

  const validateTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Validate],
    mutationFn: async () => await AuthService.validationToken(),
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        if (refreshToken) {
          refreshTokenMutation.mutate(refreshToken);
        } else {
          removeTokens();
          setIsAuthenticated(false);
        }
      }
    },
  });

  return { loginMutation, registerMutation, refreshTokenMutation, validateTokenMutation };
};
