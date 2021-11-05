import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { ICreateComment } from '../../interfaces';
import { createCommentValidation } from '../../validations/comment.validation';

const createComment = async (
  req: Request<any, any, ICreateComment, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createCommentValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = req.body;
    const postId = +req.params.id;

    await createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        comment: data.comment,
        partner_id: userId,
        post_id: postId,
      })
      .execute();

    return res.status(200).json({ message: 'Create Post Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default createComment;
