import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { User } from '../../entity/user.entity';
// import db from '../../utils/dbConfig';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  const data = await getRepository(User)
    .createQueryBuilder('user')
    .take(10)
    .skip(0)
    .getMany();
  return res.status(200).json({ data: data });
};
