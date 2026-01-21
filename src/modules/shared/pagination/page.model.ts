export interface Page<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalElements: number;
}
