import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { Post } from '../../entities/post.entity';
import { mappingComment } from '../../utils/response.mapper';

const getComment = async (req: Request, res: Response) => {
  try {
    const postId = +req.params.id;
    const commentId = +req.params.commentId;
    const exitPost = await getRepository(Post).findOne({ id: postId });

    if (!exitPost) return res.status(400).json({ message: 'Post Not Found!' });

    const data = await getRepository(Comment)
      .createQueryBuilder('pq')
      .leftJoinAndSelect('pq.author', 'au')
      .leftJoinAndSelect('pq.post', 'po')
      .where('po.id = :postId')
      .andWhere('pq.id = :commentId')
      .setParameters({ postId: postId, commentId: commentId })
      .getOne();

    if (!data) return res.status(400).json({ message: 'Comment Not Found!' });

    res.status(200).json(mappingComment(data));
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getComment;
