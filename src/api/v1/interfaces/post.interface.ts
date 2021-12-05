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

export interface BasePost {
  title: string;
  content: string;
  image_url: string;
}

export interface IPublicPost extends BasePost, IBaseDateTime {
  id: number;
  slug: string;
  author: IPublicPartner;
  categories?: ICategoryPost[];
  tags?: ITagPost[];
}

export interface ICategoryPost {
  category_id: number;
  title: string;
}

export interface ITagPost {
  id: number;
  title: string;
  slug: string;
}

export interface ICreatePost extends BasePost {
  categories: number[];
  tags: number[];
}
