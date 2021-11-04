import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { hashPassword } from '../../utils/helpers';

const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const existsUser = await getRepository(Partner)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: userData.username })
      .getOne();

    if (existsUser) {
      res.status(400).json({ message: 'Username has already exists !' });
    } else {
      const createUser = await getRepository(Partner)
        .createQueryBuilder()
        .insert()
        .into(Partner)
        .values({
          username: userData.username,
          password: await hashPassword(userData.password),
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone,
          create_date: new Date(),
          update_date: new Date(),
        })
        .returning('id')
        .execute();
      res.status(201).json({ message: 'created!' });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default register;
