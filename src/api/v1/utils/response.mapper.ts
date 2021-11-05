import { City, District, Job, Partner, PostRequest, Ward } from '../entities';
import {
  ICity,
  IDistrict,
  IPublicJob,
  IPublicLocation,
  IPublicPartner,
  IPublicPostRequest,
  IWard,
} from '../interfaces';

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

export const mappingLocation = (
  city: City,
  district: District,
  ward: Ward,
  street: string
): IPublicLocation => {
  return {
    city_code: city.id,
    city_name: city.name,
    district_code: district.id,
    district_name: district.name,
    ward_code: ward.id,
    ward_name: ward.name,
    street: street,
    full_address: `${street}, ${ward.name}, ${district.name}, ${city.name}`,
  };
};

export const mappingJob = (data: Job): IPublicJob => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    level: data.level,
    author: mappingPartner(data.author as unknown as Partner),
    location: mappingLocation(data.city, data.district, data.ward, data.street),
    create_date: data.create_date,
    update_date: data.update_date,
  };
};

export const mappingJobs = (data: Job[]): IPublicJob[] => {
  return data.map((item) => mappingJob(item));
};

export const mappingCity = (data: City): ICity => {
  return {
    id: data.id,
    name: data.name,
  };
};

export const mappingCities = (data: City[]): ICity[] => {
  return data.map((item) => mappingCity(item));
};

export const mappingDistrict = (data: District): IDistrict => {
  return {
    id: data.id,
    name: data.name,
    city_id: data.city_id,
  };
};

export const mappingDistricts = (data: District[]): IDistrict[] => {
  return data.map((item) => mappingDistrict(item));
};

export const mappingWard = (data: Ward): IWard => {
  return {
    id: data.id,
    name: data.name,
    district_id: data.district_id,
  };
};

export const mappingWards = (data: Ward[]): IWard[] => {
  return data.map((item) => mappingWard(item));
};
