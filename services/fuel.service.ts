import axiosInstance from '~/configs/axios.config';
import { FuelResponseList } from '~/constants/models/fuel.model';

export const FuelService = {
  listFuel: async (
    request?: Partial<RootRequest>
  ): Promise<RootResponse<Pagination<FuelResponseList>>> => {
    try {
      const response = await axiosInstance.get<RootResponse<Pagination<FuelResponseList>>>(
        `/api/fuel-types`,
        {
          params: request,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
