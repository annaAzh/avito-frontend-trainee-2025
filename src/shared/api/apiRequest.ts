import { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types';
import { axiosInstance } from './instance';

const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const isFormData = config?.data instanceof FormData;

    const response = await axiosInstance.request<T>({
      method,
      url,
      headers: {
        ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        ...config?.headers,
      },
      ...config,
    });

    if (method === 'delete' && response.status !== 204) {
      throw Error(response.statusText);
    }

    return { success: true, data: response.data };
  } catch (error) {
    const default_error_message = 'Неизвестная ошибка';

    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data || error.message };
    } else if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: default_error_message };
  }
};

export { apiRequest };
