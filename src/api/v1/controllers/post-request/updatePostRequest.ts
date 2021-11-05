import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { PostRequest } from '../../entities';
import { bastPostRequestValidation } from '../../validations';

const updatePostRequest = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = bastPostRequestValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { title, content } = req.body;

    await createQueryBuilder()
      .update(PostRequest)
      .set({
        title: title,
        content: content,
      })
      .where('partner_id = :userId')
      .andWhere('id = :postId ')
      .setParameters({ userId: userId, postId: +req.params.id })
      .execute();

    return res.status(200).json({ message: 'Update Post Request Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default updatePostRequest;
