import axiosInstance from '~/configs/axios.config';
import { ContactParams } from '~/constants/models/contact.mode';

export const ContactService = {
  get: {
    approve_review_contact: async (id: string) => {
      const response = await axiosInstance.get(`/api/bookings/${id}/approve-review-contact`);
      return response.data;
    },
    preview_contact: async (params: ContactParams) => {
      const response = await axiosInstance.get(`/api/bookings/preview-contact`, { params });
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
