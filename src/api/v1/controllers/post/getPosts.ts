import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { mappingPosts } from '../../utils/response.mapper';

const getPosts = async (req: Request, res: Response) => {
  try {
    const [data, total] = await getRepository(Post)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .leftJoinAndSelect('pq.postCategory', 'pc')
      .leftJoinAndSelect('pc.category', 'category')
      .leftJoinAndSelect('pq.postTag', 'pt')
      .leftJoinAndSelect('pt.tag', 'tag')
      .getManyAndCount();

    console.log(data);

    res.status(200).json({ total, data });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPosts;
