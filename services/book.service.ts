import axiosInstance from '~/configs/axios.config';
import {
  BookApprovePayload,
  BookCompleteResponse,
  BookParams,
  BookPayload,
  BookPaymentResponse,
  BookPostInspection,
  BookPostInspectionPayload,
  BookPreInspectionPayload,
  BookResponseDetail,
  BookResponseList,
  BookStartTripPayload,
  BookUpdatePayload,
  BookUpdateResponse,
  Webhook,
} from '~/constants/models/book.model';

export const BookService = {
  get: {
    list: async (
      params?: Partial<BookParams>
    ): Promise<RootResponse<Pagination<BookResponseList>>> => {
      const response = await axiosInstance.get('/api/bookings', { params });
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<BookResponseDetail>> => {
      const response = await axiosInstance.get(`/api/bookings/${id}`);
      return response.data;
    },

    contracts: async (id: string) => {
      const response = await axiosInstance.get(`/api/bookings/${id}/contract`);
      return response.data;
    },

    payment: async (token: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.get(`/api/bookings/payment/${token}`);
      return response.data;
    },
  },
  post: {
    bookings: async (payload: BookPayload): Promise<RootResponse<any>> => {
      const response = await axiosInstance.post('/api/bookings', payload);
      return response.data;
    },

    bookingPayment: async (id: string): Promise<RootResponse<BookPaymentResponse>> => {
      const response = await axiosInstance.post(`/api/bookings/${id}/payment`);
      return response.data;
    },

    webhook: async (payload: Webhook) => {
      const response = await axiosInstance.post('/api/webhook', payload);
      return response.data;
    },

    track: async (id: string, payload: BookStartTripPayload) => {
      const response = await axiosInstance.post(`/api/bookings/${id}/track`, payload);
      return response.data;
    },

    postInspection: async (
      bookingId: string,
      payload: BookPostInspectionPayload
    ): Promise<RootResponse<BookPostInspection>> => {
      const formData = new FormData();
      formData.append('fuelGaugeFinalPhotos', payload.fuelGaugeFinalPhotos);
      formData.append('cleanlinessPhotos', payload.cleanlinessPhotos);
      formData.append('scratchesPhotos', payload.scratchesPhotos);
      formData.append('tollFeesPhotos', payload.tollFeesPhotos);
      const response = await axiosInstance.postForm(
        `/api/bookings/${bookingId}/post-inspection`,
        formData
      );

      return response.data;
    },

    preInspection: async (
      bookingId: string,
      payload: BookPreInspectionPayload
    ): Promise<RootResponse<BookPostInspection>> => {
      const formData = new FormData();
      formData.append('exteriorPhotos', payload.exteriorPhotos);
      formData.append('fuelGaugePhotos', payload.fuelGaugePhotos);
      formData.append('carKeyPhotos', payload.carKeyPhotos);
      formData.append('trunkPhotos', payload.trunkPhotos);
      formData.append('parkingLocationPhotos', payload.parkingLocationPhotos);
      const response = await axiosInstance.postForm(
        `/api/bookings/${bookingId}/pre-inspection`,
        formData
      );

      return response.data;
    },
  },
  put: {
    complete: async (id: string): Promise<RootResponse<BookCompleteResponse>> => {
      const response = await axiosInstance.put(`/api/bookings/${id}/complete`);
      return response.data;
    },

    cancel: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.put(`/api/bookings/${id}/cancel`);
      return response.data;
    },

    startTrip: async (id: string, payload: BookStartTripPayload) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/start-trip`, payload);
      return response.data;
    },

    approveOrReject: async (id: string, payload: BookApprovePayload) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/approve`, payload);
      return response.data;
    },
    return: async (id: string) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/return`);
      return response.data;
    },

    extend: async (
      id: string,
      payload: BookUpdatePayload
    ): Promise<RootResponse<BookUpdateResponse>> => {
      const response = await axiosInstance.put(`/api/bookings/${id}/extend`, payload);
      return response.data;
    },
  },
  delete: {},
  patch: {},
};
