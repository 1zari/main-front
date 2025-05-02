// API 공통 응답 타입
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// API 에러 응답 타입
export interface ApiError {
  status: number;
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}

// API 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  has_next: boolean;
}

// API 요청 옵션 타입
export interface ApiRequestOptions {
  secure?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}
