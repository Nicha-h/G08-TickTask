/// <reference types="vite/client" />

import axios from 'axios';
import { getAuthToken } from './auth';

export const getBaseAPIURL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: getBaseAPIURL,
  withCredentials: true,
});

// Every request carries a fresh Neon Auth JWT, replacing whatever token a call site read from localStorage
apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

// Fail fast on networkkk SO the server err when it is missing this
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      console.error(
        `[apiClient] Cannot reach API server at "${getBaseAPIURL || window.location.origin}". ` +
          'Check that VITE_API_BASE_URL is set correctly or the backend is running.',
      );
    }
    return Promise.reject(error);
  },
);
