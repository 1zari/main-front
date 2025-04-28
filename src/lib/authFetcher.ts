import { authAxiosInstance } from "./authAxios";
import qs from "qs";
import { AxiosResponse } from "axios";

type RequestOptions = {
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
};

export const authFetcher = {
  get: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const query = options?.params
      ? `?${qs.stringify(options.params, { skipNulls: true, arrayFormat: "brackets" })}`
      : "";
    const res: AxiosResponse<T> = await authAxiosInstance.get(`${path}${query}`, {
      headers: options?.headers,
    });
    return res.data;
  },

  post: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const res: AxiosResponse<T> = await authAxiosInstance.post(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  put: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const res: AxiosResponse<T> = await authAxiosInstance.put(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  patch: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const res: AxiosResponse<T> = await authAxiosInstance.patch(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  delete: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const res: AxiosResponse<T> = await authAxiosInstance.delete(path, {
      data: body,
      headers: options?.headers,
    });
    return res.data;
  },
};
