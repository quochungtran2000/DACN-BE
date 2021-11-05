import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Job } from '../../entities';
import { createJobValidation } from '../../validations/job.validation';

const updateCareer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createJobValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = req.body;
    const jobId = +req.params.id;

    const myJob = await getRepository(Job).findOne({
      id: jobId,
    });

    if (!myJob) return res.status(400).json({ message: 'Job not found!' });

    if (myJob.author_id !== userId)
      return res.status(400).json({ message: 'You dont have permission' });

    await createQueryBuilder()
      .update(Job)
      .set({
        title: data.title,
        content: data.content,
        level: data.level,
        slug: data.title,
        city_id: data.city_id,
        district_id: data.district_id,
        ward_id: data.ward_id,
        street: data.street,
        zip: data.ward_id,
      })
      .where('author_id = :userId')
      .andWhere('id = :postId ')
      .setParameters({ userId: userId, postId: jobId })
      .execute();

    return res.status(200).json({ message: 'Update Job Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default updateCareer;
