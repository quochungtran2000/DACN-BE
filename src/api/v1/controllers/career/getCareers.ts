import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Job } from '../../entities';
import { mappingJobs } from '../../utils/response.mapper';

const getCareers = async (req: Request, res: Response) => {
  try {
    const [data, total] = await getRepository(Job)
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.author', 'au')
      .leftJoinAndSelect('job.city', 'ci')
      .leftJoinAndSelect('job.district', 'di')
      .leftJoinAndSelect('job.ward', 'wa')
      .getManyAndCount();

    res.status(200).json({ total, data: mappingJobs(data) });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getCareers;
