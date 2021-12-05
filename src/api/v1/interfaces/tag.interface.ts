export interface ITag {
  id: number;
  title: string;
  slug: string;
  create_date: Date;
  update_date: Date;
}

export interface IPublicTag {
  id: number;
  title: string;
  slug: string;
}
