import axiosInstance from '~/configs/axios.config';
import { CarParams, CarResponseList } from '~/constants/models/car.model';

export const CarService = {
  get: {
    list: async (params: CarParams): Promise<RootResponse<Pagination<CarResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/cars', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    detail: async (id: string): Promise<RootResponse<CarResponseList>> => {
      try {
        const response = await axiosInstance.get(`/api/cars/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  post: {},
  put: {},
  delete: {},
  patch: {},
};
