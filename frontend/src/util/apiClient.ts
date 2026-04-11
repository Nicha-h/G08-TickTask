/// <reference types="vite/client" />

import axios from 'axios';

export const getBaseAPIURL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: getBaseAPIURL,
  withCredentials: true,
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
