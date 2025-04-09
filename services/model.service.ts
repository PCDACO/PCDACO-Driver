import axiosInstance from '~/configs/axios.config';
import { ModelsResponse } from '~/constants/models/model.model';

export const ModelsService = {
  get: {
    list: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<ModelsResponse>>> => {
      const response = await axiosInstance.get<RootResponse<Pagination<ModelsResponse>>>(
        `/api/models`,
        { params }
      );
      return response.data;
    },
  },
};
