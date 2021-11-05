import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { ICreatePost } from '../../interfaces/post.interface';
import { createPostValidation } from '../../validations';

const updatePost = async (
  req: Request<any, any, ICreatePost, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createPostValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = req.body;
    const postId = +req.params.id;

    const myJob = await getRepository(Post).findOne({
      id: postId,
    });

    if (!myJob) return res.status(400).json({ message: 'Job not found!' });

    if (myJob.author_id !== userId)
      return res.status(400).json({ message: 'You dont have permission' });

    await createQueryBuilder()
      .update(Post)
      .set({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        slug: data.title,
        update_date: new Date(),
      })
      .where('author_id = :userId')
      .andWhere('id = :postId ')
      .setParameters({ userId: userId, postId: postId })
      .execute();

    return res.status(200).json({ message: 'Update Post Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default updatePost;
