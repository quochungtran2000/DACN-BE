import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';

const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized!' });

    const data = await getRepository(Partner)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.partner_role', 'pr')
      .leftJoinAndSelect('pr.role', 'r')
      .where('user.id =:userId')
      .setParameters({ userId: userId })
      .getOne();

    if (!data) return res.status(404).json({ message: 'USER NOT FOUND' });

    const { password, partner_role, ...userData } = data;
    const [partnerRole] = partner_role;
    const role = partnerRole.role.role;

    res.status(200).json({ ...userData, role: role });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export default me;
