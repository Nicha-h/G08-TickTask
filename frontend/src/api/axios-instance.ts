import axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = axios.create({ baseURL: 'https://api.example.com' });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE(config).then((response) => response.data);
};