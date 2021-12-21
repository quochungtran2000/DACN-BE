import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Job } from '../../entities';
import { mappingJobs } from '../../utils/response.mapper';

const getJob = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const page = Number(req.query?.page) || 1;
  const size = Number(req.query?.page_size) || 12;
  try {
    const [data, total] = await getRepository(Job)
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.author', 'au')
      .leftJoinAndSelect('job.city', 'ci')
      .leftJoinAndSelect('job.district', 'di')
      .leftJoinAndSelect('job.ward', 'wa')
      .where('au.id = :userId', { userId })
      .take(size)
      .skip((page - 1) * size)
      .orderBy('job.create_date', 'DESC')
      .getManyAndCount();

    res.status(200).json({ total, data: mappingJobs(data) });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getJob;
