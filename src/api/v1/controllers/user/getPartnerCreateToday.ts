import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';

const getPartnerCreateToday = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  try {
    const start = new Date(new Date().setHours(0, 0, 0, 0));
    const end = new Date(new Date().setHours(23, 59, 59, 999));

    console.log({ start });
    console.log({ end });

    const data = await getRepository(Partner)
      .createQueryBuilder('user')
      .where('user.create_date > :start', { start })
      .getCount();

    const total = await getRepository(Partner)
      .createQueryBuilder('user')
      .getCount();

    res.status(200).json({ data, total });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getPartnerCreateToday;
