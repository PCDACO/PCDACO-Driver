import axiosInstance from '~/configs/axios.config';
import { ContactParams } from '~/constants/models/contact.mode';

export const ContactService = {
  get: {
    approve_review_contact: async (id: string) => {
      const response = await axiosInstance.get(`/api/bookings/${id}/approval-preview-contract`);
      return response.data;
    },
    preview_contact: async (params: ContactParams) => {
      const response = await axiosInstance.get(`/api/bookings/preview-contract`, {
        params: {
          ...params,
          startTime: params.startTime.toISOString(),
          endTime: params.endTime.toISOString(),
        },
      });
      return response.data;
    },
  },

  put: {
    contact: async (id: string) => {
      const response = await axiosInstance.put(`/api/schedules/${id}/contact`);
      return response.data;
    },
  },
};
