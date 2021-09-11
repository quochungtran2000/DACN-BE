import dotenv from 'dotenv';
import { getEnv } from './helpers';
dotenv.config();

export const PORT = getEnv('PORT');
export const DB_PG_HOST = getEnv('DB_PG_HOST');
export const DB_PG_USERNAME = getEnv('DB_PG_USERNAME');
export const DB_PG_PASSWORD = getEnv('DB_PG_PASSWORD');
export const DB_PG_NAME = getEnv('DB_PG_NAME');
export const DB_PG_PORT = getEnv('DB_PG_PORT');
export const USER_SECRET = 'hung12341234';
