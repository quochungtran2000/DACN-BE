import { create } from 'domain';
import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Tag } from '../../entities/tag.entity';
import { ICategory, ITag } from '../../interfaces';
import { categoryValicator } from '../../validations/category.validation';

export const updateTag = async (
  req: Request<any, any, ITag, any>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const { error } = categoryValicator.validate(data);
    if (error) return res.status(400).json({ message: error.message });
    await createQueryBuilder()
      .update(Tag)
      .set({
        title: data.title,
        slug: data.slug,
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
