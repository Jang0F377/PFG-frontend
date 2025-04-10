/**
 * Standard API response format from the backend
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data: T;
  meta: Record<string, any>;
}

/**
 * Generic type for unwrapped API data
 * Use this in service interfaces to define just the data structure
 * without repeating the wrapper format
 */
export type ApiData<T> = T;
