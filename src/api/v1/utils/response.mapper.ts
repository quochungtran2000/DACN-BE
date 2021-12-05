import { City, District, Job, Partner, PostRequest, Ward } from '../entities';
import { Category } from '../entities/category.entity';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { PostCategory } from '../entities/post_category.entity';
import { Tag } from '../entities/tag.entity';
import {
  ICity,
  IDistrict,
  IPublicCategory,
  IPublicComment,
  IPublicJob,
  IPublicLocation,
  IPublicPartner,
  IPublicPostRequest,
  IPublicTag,
  IWard,
} from '../interfaces';
import { ICategoryPost, IPublicPost } from '../interfaces/post.interface';

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

// export const mappingCategory = (data: PostCategory): ICategoryPost => {
//     return {
//       category_id: data.category_id,
//       title: data.category.title,
//     };
// };

// export const mappingTag = (data: Tag): IPublicTag => {
//   return {
//     id: data.id,
//     title: data.title,
//     slug: data.slug
//   };
// }

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

export const mappingPost = (data: Post): IPublicPost => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    image_url: data.image_url,
    slug: data.slug,
    author: mappingPartner(data.author),
    create_date: data.create_date,
    update_date: data.update_date,
  };
};

export const mappingPosts = (data: Post[]): IPublicPost[] => {
  return data.map((item) => mappingPost(item));
};

export const mappingComment = (data: Comment): IPublicComment => {
  return {
    id: data.id,
    comment: data.comment,
    author_id: data.author.id,
    author_name: data.author.fullname,
    create_date: data.create_date,
    update_date: data.update_date,
  };
};

export const mappingComments = (data: Comment[]): IPublicComment[] => {
  return data.map((item) => mappingComment(item));
};
