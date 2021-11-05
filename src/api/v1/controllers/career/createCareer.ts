import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Job } from '../../entities';
import { IBaseJob } from '../../interfaces';
import { createJobValidation } from '../../validations/job.validation';

const createCareer = async (
  req: Request<any, any, IBaseJob, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createJobValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const data = req.body;

    await createQueryBuilder()
      .insert()
      .into(Job)
      .values({
        title: data.title,
        content: data.content,
        level: data.level,
        is_public: true,
        slug: data.title,
        city_id: data.city_id,
        district_id: data.district_id,
        ward_id: data.ward_id,
        street: data.street,
        zip: data.ward_id,
        author_id: userId,
      })
      .execute();

    return res.status(200).json({ message: 'Create Job Request Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default createCareer;
