import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PostRequest } from '../../entities';
import { mappingPostRequest } from '../../utils/response.mapper';

const getPostRequest = async (req: Request, res: Response) => {
  try {
    const data = await getRepository(PostRequest)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .where('pq.id = :id')
      .setParameters({ id: +req.params.id })
      .getOne();

    if (!data)
      return res.status(400).json({ message: 'Post Request Not Found!' });

    return res.status(200).json(mappingPostRequest(data));
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPostRequest;
