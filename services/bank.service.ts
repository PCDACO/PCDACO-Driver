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
      try {
        const response = await axiosInstance.get('/api/bank-info', { params: { search } });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    accounts: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<BankAccountResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/bank-accounts', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    detail_account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.get(`/api/bank-accounts/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  post: {
    account: async (
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.post('/api/bank-accounts', payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  put: {
    account: async (
      id: string,
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.put(`/api/bank-accounts/${id}`, payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  delete: {
    account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.delete(`/api/bank-accounts/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
