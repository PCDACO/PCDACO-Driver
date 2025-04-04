import axiosInstance from '~/configs/axios.config';
import {
  ReportApprovePayload,
  ReportApproveResponse,
  ReportDetailResponse,
  ReportListResponse,
  ReportParams,
  ReportPayload,
  ReportCompensationPayload,
  ReportCompensationResponse,
  ReportCompensationProofPayload,
  ReportCompensationProofResponse,
  ReportImagePayload,
  ReportImageReponse,
} from '~/constants/models/report.model';

export const ReportService = {
  get: {
    list: async (
      params?: Partial<ReportParams>
    ): Promise<RootResponse<Pagination<ReportListResponse>>> => {
      try {
        const response = await axiosInstance.get('/api/reports', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    detail: async (id: string): Promise<RootResponse<ReportDetailResponse>> => {
      try {
        const response = await axiosInstance.get(`/api/reports/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  post: {
    create: async (payload: ReportPayload): Promise<RootResponse<{ id: string }>> => {
      try {
        const response = await axiosInstance.post('/api/reports', payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  put: {
    approve: async (
      reportId: string,
      payload: ReportApprovePayload
    ): Promise<RootResponse<ReportApproveResponse>> => {
      try {
        const response = await axiosInstance.put(`/api/reports/${reportId}/approve`, payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    compensation: async (
      reportId: string,
      payload: ReportCompensationPayload
    ): Promise<RootResponse<ReportCompensationResponse>> => {
      try {
        const response = await axiosInstance.put(`/api/reports/${reportId}/compensation`, payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
  delete: {},
  patch: {
    compensationProof: async (
      reportId: string,
      payload: ReportCompensationProofPayload
    ): Promise<RootResponse<ReportCompensationProofResponse>> => {
      try {
        const response = await axiosInstance.patch(
          `/api/reports/${reportId}/compensation-proof`,
          payload
        );
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    image: async (
      reportId: string,
      payload: ReportImagePayload
    ): Promise<RootResponse<ReportImageReponse>> => {
      try {
        const formData = new FormData();

        payload.files.forEach((file) => {
          formData.append('files', file);
        });

        const response = await axiosInstance.patchForm(`/api/reports/${reportId}/images`, formData);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
