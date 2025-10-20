export interface ApiContent<T> {
  data: T;
  meta?: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
  };
  links?: {
    next?: string;
    prev?: string | null;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  content: ApiContent<T>;
  status: number;
}
