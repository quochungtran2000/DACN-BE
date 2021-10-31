export interface IJob {
  id: number;
  title: string;
  content: string;
  level: string;
  is_public: boolean;
  is_deleted: boolean;
  slug: string;
  city_id: number;
  district_id: number;
  ward_id: number;
  street: string;
  zip: number;
  author_id: number;
  create_date: Date;
  update_date: Date;
}
