import axios from 'axios';

import axiosInstance from '~/configs/axios.config';
import {
  BankAccountResponse,
  BankPayload,
  BankRequest,
  BankResponse,
} from '~/constants/models/bank.model';

const urlBank = process.env.EXPO_PUBLIC_BANK_API_URL;

export const BankService = {
  get: {
    list: async (params: BankRequest): Promise<RootResponse<Pagination<BankResponse>>> => {
      try {
        const response = await axiosInstance.get('/api/banks', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  post: {
    findAccount: async (payload: BankPayload): Promise<RootBankResponse<BankAccountResponse>> => {
      //   const accessToken = await storage.getItem('accessToken');
      try {
        const response = await axios.post(`${urlBank}/id-lookup-prod`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.EXPO_PUBLIC_BANK_API_KEY,
            'x-api-secret': process.env.EXPO_PUBLIC_BANK_API_SECRET,
            // Authorization: `Bearer ${accessToken}`,
          },
        });

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
