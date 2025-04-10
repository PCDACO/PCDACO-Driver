import axios from 'axios';

const AI_API_KEY = process.env.EXPO_PUBLIC_AI_API_KEY;
const AI_API_URL = process.env.EXPO_PUBLIC_AI_API_URL;

export const AiService = {
  post: async (image: File) => {
    const response = axios.postForm(
      `${AI_API_URL}/dlr/vnm`,
      {
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
        },
      }
    );
  },
};
