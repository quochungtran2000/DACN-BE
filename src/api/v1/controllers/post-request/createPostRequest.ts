import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { PostRequest } from '../../entities';
import { ICreatePostRequest } from '../../interfaces';
import { bastPostRequestValidation } from '../../validations';

const createPostRequest = async (
  req: Request<any, any, ICreatePostRequest, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = bastPostRequestValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { title, content } = req.body;

    await createQueryBuilder()
      .insert()
      .into(PostRequest)
      .values({
        title: title,
        content: content,
        partner_id: userId,
      })
      .execute();

    return res.status(200).json({ message: 'Create Post Request Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default createPostRequest;
