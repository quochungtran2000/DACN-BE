import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';

const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized!' });

    const data = await getRepository(Partner)
      .createQueryBuilder('user')
      .where('user.id =:userId')
      .setParameters({ userId: userId })
      .getOne();

    if (!data) return res.status(404).json({ message: 'USER NOT FOUND' });

    const { password, ...userData } = data;

    res.status(200).json(userData);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export default me;
