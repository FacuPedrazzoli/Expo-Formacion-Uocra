export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export type ApiResult<T> = ApiResponse<T> & Partial<ApiSuccess<T>>;
