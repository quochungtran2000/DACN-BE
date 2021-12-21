import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await getRepository(Post)
      .createQueryBuilder()
      .update(Post)
      .set({ is_public: false })
      .where('id =:id', { id })
      .execute();
    return res.status(200).json({ message: 'delete post success' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default deletePost;
