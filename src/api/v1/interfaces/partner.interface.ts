import { IBaseDateTime } from '.';

export interface IPartner extends ICreatePartner, IBaseDateTime {
  id: number;
}

export interface ICreatePartner {
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
}
