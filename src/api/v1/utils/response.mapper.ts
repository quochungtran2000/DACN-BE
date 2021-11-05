import { Partner, PostRequest } from '../entities';
import { IPublicPartner, IPublicPostRequest } from '../interfaces';

export const mappingPartner = (data: Partner): IPublicPartner => {
  return {
    id: data.id,
    fullname: data.fullname,
    username: data.username,
    email: data.email,
    phone: data.phone,
    create_date: data.create_date,
    update_date: data.update_date,
  };
};

export const mappingPostRequest = (data: PostRequest): IPublicPostRequest => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    partner_id: data.partner_id,
    author: mappingPartner(data.author),
    create_date: data.create_date,
    update_date: data.update_date,
  };
};

export const mappingPostRequests = (
  data: PostRequest[]
): IPublicPostRequest[] => {
  return data.map((item) => mappingPostRequest(item));
};
