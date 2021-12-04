import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';

export const getCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await getRepository(Category).findOne(id);
    if (!data) return res.status(404).json({ message: 'Not Found' });

    res.status(200).json({ message: 'success', data: data });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
