import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Tag } from '../../entities/tag.entity';

export const getTags = async (req: Request, res: Response) => {
  try {
    const [data, total] = await getRepository(Tag)
      .createQueryBuilder('pq')
      .getManyAndCount();

    res.status(200).json({ total, data });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
