import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { ICreatePost } from '../../interfaces/post.interface';
import { createPostValidation } from '../../validations';

const createPost = async (
  req: Request<any, any, ICreatePost, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createPostValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = req.body;

    await createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        is_public: true,
        state: 'DONE',
        slug: data.title,
        author_id: userId,
      })
      .execute();

    return res.status(200).json({ message: 'Create Post Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default createPost;
