import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { mappingPost } from '../../utils/response.mapper';

const getPost = async (req: Request, res: Response) => {
  try {
    const data = await getRepository(Post)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .where('pq.id = :id')
      .andWhere('pg.is_public = true')
      .setParameters({ id: +req.params.id })
      .getOne();

    if (!data)
      return res.status(400).json({ message: 'Post Request Not Found!' });

    return res.status(200).json(mappingPost(data));
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPost;
