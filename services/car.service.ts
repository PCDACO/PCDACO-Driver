import axiosInstance from '~/configs/axios.config';
import { CarParams, CarResponseDetail, CarResponseList } from '~/constants/models/car.model';

export const CarService = {
  get: {
    list: async (
      params: Partial<CarParams>
    ): Promise<RootResponse<Pagination<CarResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/cars', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    detail: async (id: string): Promise<RootResponse<CarResponseDetail>> => {
      try {
        const response = await axiosInstance.get(`/api/car/${id}`);
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
