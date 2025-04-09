import axiosInstance from '~/configs/axios.config';
import {
  BankAccountPayload,
  BankAccountResponseDetail,
  BankAccountResponseList,
  BankResponseList,
} from '~/constants/models/bank.model';

export const BankService = {
  get: {
    list: async (search?: string): Promise<RootResponse<BankResponseList[]>> => {
      const response = await axiosInstance.get('/api/bank-info', { params: { search } });
      return response.data;
    },

    accounts: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<BankAccountResponseList>>> => {
      const response = await axiosInstance.get('/api/bank-accounts', { params });
      return response.data;
    },

    detail_account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      const response = await axiosInstance.get(`/api/bank-accounts/${id}`);
      return response.data;
    },
  },

  post: {
    account: async (
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      const response = await axiosInstance.post('/api/bank-accounts', payload);
      return response.data;
    },
  },

  put: {
    account: async (
      id: string,
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      const response = await axiosInstance.put(`/api/bank-accounts/${id}`, payload);
      return response.data;
    },
  },

  delete: {
    account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      const response = await axiosInstance.delete(`/api/bank-accounts/${id}`);
      return response.data;
    },
  },
};
