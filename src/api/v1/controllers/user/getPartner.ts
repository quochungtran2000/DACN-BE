import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';

const getPartner = async (req: Request<any, any, any, any>, res: Response) => {
  try {
    const userId = req.params.id;

    const data = await getRepository(Partner)
      .createQueryBuilder('user')
      .where('user.id =:userId', { userId: userId })
      // .setParameters({ userId: userId })
      .getOne();

    if (data) {
      res.status(200).json({ user: data });
    } else {
      res.status(404).json({ message: 'NOT FOUND' });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPartner;
