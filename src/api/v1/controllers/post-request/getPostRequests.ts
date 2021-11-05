import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PostRequest } from '../../entities';
import { mappingPostRequests } from '../../utils/response.mapper';

const getPostRequests = async (req: Request, res: Response) => {
  try {
    const [data, total] = await getRepository(PostRequest)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .getManyAndCount();

    res.status(200).json({ total, data: mappingPostRequests(data) });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPostRequests;
