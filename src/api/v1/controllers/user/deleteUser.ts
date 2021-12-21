import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { Post } from '../../entities/post.entity';

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    await getRepository(Partner)
      .createQueryBuilder()
      .update(Partner)
      .set({ ban: true })
      .where('id =:id')
      .setParameters({ id })
      .execute();
    return res.status(200).json({ message: 'delete user success' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default deleteUser;
