import { httpClient, createHttpClient } from "./axios";
import { authHelpers } from "@/utils/authHelpers";
import qs from "qs";
import { AxiosResponse } from "axios";
import { getCookie } from "@/utils/cookie"; // csrftoken 꺼내기

// CSRF 처리를 위한 보안 클라이언트
const secureClient = createHttpClient(authHelpers);

type RequestOptions = {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  secure?: boolean;
};

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export const fetcher = {
  // GET
  get: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const query = options?.params
      ? `?${qs.stringify(options.params, { skipNulls: true, arrayFormat: "brackets" })}`
      : "";
    const client = options?.secure ? secureClient : httpClient;
    const res: AxiosResponse<T> = await client.get(`${path}${query}`, {
      headers: options?.headers,
      withCredentials: options?.secure ?? false,
    });
    return res.data;
  },

  // POST
  post: async <T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;
    const isFormData = body instanceof FormData;

    // FormData면 multipart, 아니면 json
    const headers: Record<string, string> = {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(options?.secure && { "X-CSRFToken": getCookie("csrftoken") || "" }),
      ...options?.headers,
    };

    const res: AxiosResponse<T> = await client.post<T, AxiosResponse<T>, B>(path, body!, {
      withCredentials: options?.secure ?? false,
      headers,
    });
    return res.data;
  },

  // PUT
  put: async <T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(options?.secure && { "X-CSRFToken": getCookie("csrftoken") || "" }),
      ...options?.headers,
    };
    const res: AxiosResponse<T> = await client.put<T, AxiosResponse<T>, B>(path, body!, {
      withCredentials: options?.secure ?? false,
      headers,
    });
    return res.data;
  },

  // PATCH
  patch: async <T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(options?.secure && { "X-CSRFToken": getCookie("csrftoken") || "" }),
      ...options?.headers,
    };
    const res: AxiosResponse<T> = await client.patch<T, AxiosResponse<T>, B>(path, body!, {
      withCredentials: options?.secure ?? false,
      headers,
    });
    return res.data;
  },

  // DELETE
  delete: async <T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(options?.secure && { "X-CSRFToken": getCookie("csrftoken") || "" }),
      ...options?.headers,
    };
    const res: AxiosResponse<T> = await client.delete<T, AxiosResponse<T>, B>(path, {
      data: body!,
      withCredentials: options?.secure ?? false,
      headers,
    });
    return res.data;
  },
};
