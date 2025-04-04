import axios from 'axios';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const handleApiError = async (error: any) => {
  const originalRequest = error.config;
  const { setTokens, removeTokens } = useAuthStore.getState();

  // If error is 401 and we haven't tried to refresh token yet
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = await storage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Attempt to refresh the token
      const response = await AuthService.refreshToken(refreshToken);

      // Store new tokens using Zustand store
      await setTokens(response.value.accessToken, response.value.refreshToken);

      // Update the original request with new token
      originalRequest.headers.Authorization = `Bearer ${response.value.accessToken}`;

      // Retry the original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // If refresh token fails, clear tokens using Zustand store
      await removeTokens();
      return Promise.reject(refreshError);
    }
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
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => handleApiError(error)
);

export default axiosInstance;
