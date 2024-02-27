import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getFullUrl } from ".";

export const httpService = (url: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  const instance: AxiosInstance = axios.create({
    baseURL: url,
    timeout: 20000,
    headers: headers,
  });

  // Configure outbound request interceptor logic
  instance.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => Promise.reject(error)
  );

  // Configure incoming response interceptor logic
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => Promise.reject(error)
  );

  const get = <T, R = AxiosResponse<T>>(
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    return instance.get<T, R>(getFullUrl(url, params), config);
  };

  const post = <T, R = AxiosResponse<T>>(
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    return instance.post<T, R>(url, data, config);
  };

  const put = <T, R = AxiosResponse<T>>(
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    return instance.put<T, R>(url, data, config);
  };

  const del = <T, R = AxiosResponse<T>>(
    config?: AxiosRequestConfig
  ): Promise<R> => {
    return instance.delete<T, R>(url, config);
  };

  return { http: instance, get, post, put, delete: del };
};
