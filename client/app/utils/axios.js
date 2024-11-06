import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1/';

export const axiosInstance = axios.create({
  baseURL: API_URL,

  withCredentials: true,
});
