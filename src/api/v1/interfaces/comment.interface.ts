import { IBaseDateTime, IPublicPartner } from '.';

export interface IComment {
  id: number;
  partner_id: number;
  post_id: number;
  comment: string;
  create_date: Date;
  update_date: Date;
}

export interface ICreateComment {
  comment: string;
}

export interface IPublicComment extends ICreateComment, IBaseDateTime {
  id: number;
  author_name: string;
  author_id: number;
  author_image_url: string;
}
