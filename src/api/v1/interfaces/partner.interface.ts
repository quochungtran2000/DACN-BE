import { IBaseDateTime } from '.';
import { UserRole } from '../validations';

export interface IPartner extends ICreatePartner, IBaseDateTime {
  id: number;
}

export interface ICreatePartner extends IBasePartner {
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface IBasePartner {
  username: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface IPublicPartner extends IBaseDateTime, IBasePartner {
  id: number;
}
