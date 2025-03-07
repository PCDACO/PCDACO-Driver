import axiosInstance from '~/configs/axios.config';
import {
  LicenseImagesPayload,
  LicenseImagesPayloadResponse,
  LicensePayload,
  LicensePayloadResponse,
} from '~/constants/models/license.model';

export const LiccenseService = {
  get: {},
  post: {
    license: async (payload: LicensePayload): Promise<RootResponse<LicensePayloadResponse>> => {
      try {
        const response = await axiosInstance.post('/api/licenses', payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    license: async (
      id: string,
      payload: LicensePayload
    ): Promise<RootResponse<LicensePayloadResponse>> => {
      try {
        const response = await axiosInstance.put(`/api/licenses/${id}/information`, payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {},
  patch: {
    images: async (
      id: string,
      payload: LicenseImagesPayload
    ): Promise<RootResponse<LicenseImagesPayloadResponse>> => {
      console.log('call api patch images');

      const formData = new FormData();

      formData.append('licenseImageBack', payload.licenseImageBack);
      formData.append('licenseImageFront', payload.licenseImageFront);

      console.log('form data', formData);

      try {
        const response = await axiosInstance.patch(`/api/licenses/${id}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
