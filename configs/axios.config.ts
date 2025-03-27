import axios from 'axios';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const handleApiError = async (error: any) => {
  switch (error.response?.status) {
    case 401: {
      const originalRequest = error.config;
      const authStore = useAuthStore.getState();
      const refreshToken = await storage.getItem('refreshToken');

      if (refreshToken) {
        const response = await AuthService.refreshToken(refreshToken);
        if (response) {
          authStore.setTokens(response.value.accessToken, response.value.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.value.accessToken}`;
          return axios(originalRequest);
        } else {
          authStore.removeTokens();
        }
      } else {
        authStore.removeTokens();
      }
      break;
    }
    case 403: {
      break;
    }
    case 404: {
      break;
    }
    case 500: {
      const authStore = useAuthStore.getState();
      authStore.removeTokens();
      break;
    }
    default: {
      return Promise.reject(error);
    }
  }
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
