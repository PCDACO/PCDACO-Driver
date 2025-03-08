import axiosInstance from '~/configs/axios.config';
import {
  BookParams,
  BookPayload,
  BookResponseDetail,
  BookResponseList,
  Webhook,
} from '~/constants/models/book.model';

export const BookService = {
  get: {
    list: async (params: BookParams): Promise<RootResponse<Pagination<BookResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/bookings', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    detail: async (id: string): Promise<RootResponse<BookResponseDetail>> => {
      try {
        const response = await axiosInstance.get(`/api/bookings/${id}`);

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  post: {
    bookings: async (payload: BookPayload): Promise<RootResponse<any>> => {
      try {
        const response = await axiosInstance.post('/api/booking', payload);

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    bookingPayment: async (id: string) => {
      try {
        const response = await axiosInstance.post(`/api/bookings/${id}/payment`);

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    webhook: async (payload: Webhook) => {
      try {
        const response = await axiosInstance.post('/api/webhook', payload);

        return response.data;
      } catch (error: any) {
        return error.response.data;
      }
    },
  },
  put: {
    complete: async (id: string) => {
      try {
        const response = await axiosInstance.put(`/api/bookings/${id}/complete`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    cancel: async (id: string) => {
      try {
        const response = await axiosInstance.put(`/api/bookings/${id}/cancel`);

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    startTrip: async (id: string) => {
      try {
        const response = await axiosInstance.put(`/api/bookings/${id}/start-trip`);

        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  delete: {},
  patch: {},
};
