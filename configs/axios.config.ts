import axios from 'axios';
import { router } from 'expo-router';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

let currentCall: Promise<any> | null = null; // Tránh gọi refresh token nhiều lần

export const handleApiError = async (error: any) => {
  if (error.response?.status === 401) {
    const originalRequest = error.config;
    const authStore = useAuthStore.getState();
    const refreshToken = await storage.getItem('refreshToken');

    if (!refreshToken) {
      authStore.removeTokens();
      router.replace('/(auth)/login');
      return Promise.reject(error);
    }

    if (!currentCall) {
      currentCall = AuthService.refreshToken(refreshToken)
        .then((response) => {
          if (response) {
            authStore.setTokens(response.value.accessToken, response.value.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${response.value.accessToken}`;
            return axios(originalRequest);
          } else {
            authStore.removeTokens();
            router.replace('/(auth)/login');
            return Promise.reject(error);
          }
        })
        .finally(() => {
          currentCall = null; // Reset lại sau khi gọi xong
        });

      return currentCall;
    }

    authStore.removeTokens();
    router.replace('/(auth)/login');
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url === '/api/auth/login' || config.url === '/api/auth/signup') {
      return config;
    }

    const accessToken = await storage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.method === 'post') {
      config.headers['Idempotence-Key'] = generateGuid();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => handleApiError(error)
);

export default axiosInstance;
