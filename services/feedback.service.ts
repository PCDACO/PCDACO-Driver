import axiosInstance from '~/configs/axios.config';
import { FeedbackPayload, FeedbackResponse } from '~/constants/models/feedback.model';

export const feedbackService = {
  get: {
    current: async (params?: Partial<RootRequest>): Promise<RootResponse<FeedbackResponse>> => {
      const response = await axiosInstance.get('/api/feedbacks/current-user ', { params });
      return response.data;
    },
  },

  post: {
    feedback: async (id: string, data: FeedbackPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance.post(`/api/bookings/${id}/feedback`, data);
      return response.data;
    },
  },
};
