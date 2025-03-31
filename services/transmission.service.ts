import axiosInstance from '~/configs/axios.config';
import { TransmissionResponseList } from '~/constants/models/transmission.model';

export const TransmissionService = {
  listTransmissions: async (
    request?: Partial<RootRequest>
  ): Promise<RootResponse<Pagination<TransmissionResponseList>>> => {
    const response = await axiosInstance
      .get<RootResponse<Pagination<TransmissionResponseList>>>(`/api/transmission-types`, {
        params: request,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  },
};
