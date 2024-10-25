export interface IApiResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}
