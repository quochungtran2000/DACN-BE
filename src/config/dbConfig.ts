import { ConnectionOptions } from 'typeorm';
import { User } from '../api/v1/entities/user.entity';
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
  entities: [User],
};
