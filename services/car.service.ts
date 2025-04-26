import axiosInstance from '~/configs/axios.config';
import {
  CarParams,
  CarResponseDetail,
  CarResponseList,
  CarUnavailableParams,
  CarUnavailableResponse,
} from '~/constants/models/car.model';

export const CarService = {
  get: {
    list: async (
      params?: Partial<CarParams>
    ): Promise<RootResponse<Pagination<CarResponseList>>> => {
      const response = await axiosInstance.get('/api/cars', { params });
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<CarResponseDetail>> => {
      const response = await axiosInstance.get(`/api/car/${id}`);
      return response.data;
    },

    unavailable: async (
      params: CarUnavailableParams
    ): Promise<RootResponse<CarUnavailableResponse[]>> => {
      const response = await axiosInstance.get<RootResponse<CarUnavailableResponse[]>>(
        `/api/cars/${params.id}/unavailable-dates`,
        { params }
      );
      return response.data;
    },
  },
  post: {},
  put: {},
  delete: {},
  patch: {},
};
