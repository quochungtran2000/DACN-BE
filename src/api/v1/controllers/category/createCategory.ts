import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { ICategory } from '../../interfaces';
import { categoryValicator } from '../../validations/category.validation';
export const createCategory = async (
  req: Request<any, any, ICategory, any>,
  res: Response
) => {
  try {
    const data = req.body;
    const { error } = categoryValicator.validate(data);
    if (error) return res.status(400).json({ message: error.message });

    await createQueryBuilder()
      .insert()
      .into(Category)
      .values({
        title: data.title,
        slug: data.slug,
        parent_id: data.parent_id,
      })
      .execute();
    return res.status(200).json({ message: 'Create Post Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
