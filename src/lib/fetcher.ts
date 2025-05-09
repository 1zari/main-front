import { authHelpers } from "@/utils/authHelpers";
import { AxiosResponse } from "axios";
import qs from "qs";
import { createHttpClient, httpClient } from "./axios";

// 인증 전용 axios 인스턴스
const secureClient = createHttpClient(authHelpers);

secureClient.interceptors.request.use(async (config) => {
  const token = await authHelpers.getAccessToken?.();
  const role = await authHelpers.getUserRole?.();

  console.log("🔐 secureClient 요청 직전 token:", token);
  console.log("🧾 secureClient 요청 직전 role:", role);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (role) {
    config.headers["X-User-Role"] = role;
  }
  return config;
});
export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

type RequestOptions = {
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  secure?: boolean;
};

// API 응답 기본 타입
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// 기본 fetcher (인증 필요 없는 요청용)
export const fetcher = {
  get: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const query = options?.params
      ? `?${qs.stringify(options.params, { skipNulls: true, arrayFormat: "brackets" })}`
      : "";

    // 인증이 필요한 요청인 경우 secureClient 사용, 아니면 기본 httpClient 사용
    const client = options?.secure ? secureClient : httpClient;

    const res: AxiosResponse<T> = await client.get(`${path}${query}`, {
      headers: options?.headers,
    });
    return res.data;
  },

  post: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;

    const res: AxiosResponse<T> = await client.post(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  put: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;

    const res: AxiosResponse<T> = await client.put(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  patch: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;

    const res: AxiosResponse<T> = await client.patch(path, body, {
      headers: options?.headers,
    });
    return res.data;
  },

  delete: async <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> => {
    const client = options?.secure ? secureClient : httpClient;

    const res: AxiosResponse<T> = await client.delete(path, {
      data: body,
      headers: options?.headers,
    });
    return res.data;
  },
};
