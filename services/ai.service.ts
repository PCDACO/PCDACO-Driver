import axios from 'axios';

import {
  AILicensePlatePrevResponse,
  AILicensePlatePostResponse,
} from '~/constants/models/ai.model';

const AI_API_KEY = process.env.EXPO_PUBLIC_AI_API_KEY;
const AI_API_URL = process.env.EXPO_PUBLIC_AI_API_URL;

export const AiService = {
  post: {
    licensePlate: async (
      image: File
    ): Promise<AIResponse<AILicensePlatePrevResponse | AILicensePlatePostResponse>> => {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.postForm(`${AI_API_URL}/dlr/vnm`, formData, {
        headers: {
          'api-key': AI_API_KEY,
        },
      });
      return response.data;
    },
  },
};
