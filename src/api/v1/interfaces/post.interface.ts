import { IBaseDateTime, IPublicPartner } from '.';

export interface IPost extends IBaseDateTime {
  id: number;
  title: string;
  content: string;
  image_url: string;
  is_public: boolean;
  state: string;
  slug: string;
  is_deleted: boolean;
}

export interface ICreatePost {
  title: string;
  content: string;
  image_url: string;
}

export interface IPublicPost extends ICreatePost, IBaseDateTime {
  id: number;
  slug: string;
  author: IPublicPartner;
}
