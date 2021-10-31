export interface IComment {
  id: number;
  partner_id: number;
  post_id: number;
  comment: string;
  create_date: Date;
  update_date: Date;
}
