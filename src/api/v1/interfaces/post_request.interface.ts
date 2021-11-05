import { IBaseDateTime, IPublicPartner } from '.';

export interface IPostRequest extends IBasePostRequest, IBaseDateTime {
  id: number;
  partner_id: number;
}

export interface ICreatePostRequest extends IBasePostRequest {}

export interface IBasePostRequest {
  title: string;
  content: string;
}

export interface IPublicPostRequest extends IPostRequest {
  author: IPublicPartner;
}
