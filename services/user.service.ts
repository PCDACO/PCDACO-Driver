import axiosInstance from '~/configs/axios.config';
import { UserPasswordPayload, UserPayload, UserResponse } from '~/constants/models/user.model';

export const UserService = {
  get: {
    current: async (): Promise<RootResponse<UserResponse>> => {
      const response = await axiosInstance.get('/api/users/current');
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<UserResponse>> => {
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;
    },
  },
  post: {},
  put: {
    user: async (id: string, payload: UserPayload): Promise<RootResponse<UserResponse>> => {
      const response = await axiosInstance.put(`/api/users/${id}`, payload);
      return response.data;
    },
  },
  delete: {},
  patch: {
    avatar: async (id: string, avatar: File): Promise<RootResponse<any>> => {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axiosInstance.patch(`/api/users/${id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    password: async (id: string, payload: UserPasswordPayload): Promise<RootResponse<any>> => {
      const response = await axiosInstance.patch(`/api/users/${id}/password`, payload);
      return response.data;
    },
  },
};
