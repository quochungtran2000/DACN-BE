import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { Post } from '../../entities/post.entity';
import { mappingComments } from '../../utils/response.mapper';

const getComments = async (req: Request, res: Response) => {
  try {
    const postId = +req.params.id;
    const exitPost = await getRepository(Post).findOne({ id: postId });

    if (!exitPost) return res.status(400).json({ message: 'Post Not Found!' });

    const [data, total] = await getRepository(Comment)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .leftJoinAndSelect('pq.post', 'po')
      .where('po.id = :postId')
      .orderBy('pq.create_date', 'ASC')
      .setParameters({ postId: postId })
      .getManyAndCount();

    res.status(200).json({ total, data: mappingComments(data) });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getComments;
