import axiosInstance from '~/configs/axios.config';
import {
  TransactionResponse,
  TransactionParams,
  WithdrawParams,
  WithdrawResponse,
  WithdrawPayload,
  WithdrawPayloadResponse,
} from '~/constants/models/transaction.model';

export const TransactionService = {
  get: {
    withdraw: async (params: Partial<WithdrawParams>): Promise<WithdrawResponse> => {
      try {
        const response = await axiosInstance.get('/api/withdrawals', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    transaction: async (params: Partial<TransactionParams>): Promise<TransactionResponse> => {
      try {
        const response = await axiosInstance.get('/api/transactions', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  post: {
    withdraw: async (payload: WithdrawPayload): Promise<WithdrawPayloadResponse> => {
      try {
        const response = await axiosInstance.post('/api/withdrawals', payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
