export interface IResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface IAuthResponse {
  token: string;
}
