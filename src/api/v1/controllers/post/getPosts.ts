import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { mappingPosts } from '../../utils/response.mapper';

const getPosts = async (req: Request, res: Response) => {
  const page = Number(req.query?.page) || 1;
  const size = Number(req.query?.page_size) || 12;

  try {
    const [data, total] = await getRepository(Post)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .leftJoinAndSelect('pq.postCategory', 'pc')
      .leftJoinAndSelect('pc.category', 'category')
      .leftJoinAndSelect('pq.postTag', 'pt')
      .leftJoinAndSelect('pt.tag', 'tag')
      .where('pq.is_public = true')
      .take(size)
      .skip((page - 1) * size)
      .orderBy('pq.create_date', 'DESC')
      .getManyAndCount();

    res.status(200).json({ total, data });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPosts;
