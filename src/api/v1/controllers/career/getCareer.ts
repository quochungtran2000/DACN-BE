import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Job } from '../../entities';
import { mappingJob } from '../../utils/response.mapper';

const getCareer = async (req: Request, res: Response) => {
  try {
    const data = await getRepository(Job)
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.author', 'au')
      .leftJoinAndSelect('job.city', 'ci')
      .leftJoinAndSelect('job.district', 'di')
      .leftJoinAndSelect('job.ward', 'wa')
      .where('job.id = :postId')
      .setParameters({ postId: +req.params.id })
      .getOne();

    if (!data)
      return res.status(400).json({ message: 'Post Request Not Found!' });

    return res.status(200).json(mappingJob(data));
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getCareer;
