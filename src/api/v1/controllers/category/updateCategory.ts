import { create } from 'domain';
import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { ICategory } from '../../interfaces';
import { categoryValicator } from '../../validations/category.validation';

export const updateCategory = async (
  req: Request<any, any, ICategory, any>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const { error } = categoryValicator.validate(data);
    if (error) return res.status(400).json({ message: error.message });
    await createQueryBuilder()
      .update(Category)
      .set({
        title: data.title,
        slug: data.slug,
        parent_id: data.parent_id,
        update_date: new Date(),
      })
      .where('id =:id', { id: id })
      .execute();
    res.status(200).json({ message: 'update successfull' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
