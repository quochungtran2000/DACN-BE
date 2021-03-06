import { ConnectionOptions } from 'typeorm';
import {
  City,
  District,
  Job,
  Partner,
  PartnerRole,
  PostRequest,
  Role,
  Ward,
} from '../api/v1/entities';
import { Category } from '../api/v1/entities/category.entity';
import { Comment } from '../api/v1/entities/comment.entity';
import { Post } from '../api/v1/entities/post.entity';
import { PostCategory } from '../api/v1/entities/post_category.entity';
import { PostTag } from '../api/v1/entities/post_tag.entity';
import { Tag } from '../api/v1/entities/tag.entity';
import {
  DB_PG_HOST,
  DB_PG_PORT,
  DB_PG_USERNAME,
  DB_PG_PASSWORD,
  DB_PG_NAME,
} from './constant';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_PG_HOST,
  port: Number(DB_PG_PORT) || 5432,
  username: DB_PG_USERNAME,
  password: DB_PG_PASSWORD,
  database: DB_PG_NAME,
  entities: [
    City,
    District,
    Ward,
    Role,
    PartnerRole,
    Partner,
    Job,
    PostRequest,
    Post,
    Comment,
    Category,
    PostCategory,
    Tag,
    PostTag,
  ],
};
