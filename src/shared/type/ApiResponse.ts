export interface IApiResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}

export interface PaginationReq {
  current?: number;
  pageSize?: number;
}

export interface DataWithPagination<T> {
  pagination?: PaginationReq;
  items?: T[];
}

export interface PaginationRes {
  current?: number;
  pageSize?: number;
  total?: number;
}

export const paginationDefault: PaginationReq = {
  current: 1,
  pageSize: 10,
};

export const pageSizeOptions = ["10", "20", "50", "100"];
