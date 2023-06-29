import axios from 'axios';
export const createApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

createApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);
