import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Partner, PartnerRole } from '../../entities';
import { ICreatePartner } from '../../interfaces';
import { generatorToken, hashPassword } from '../../utils/helpers';
import { createPartnerValidation, Role, UserRole } from '../../validations';

const register = async (
  req: Request<any, any, ICreatePartner, any>,
  res: Response
) => {
  try {
    const userData = req.body;

    const { error } = createPartnerValidation.validate(userData);
    if (error) return res.status(400).json({ message: error.message });

    const existsUser = await getRepository(Partner)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: userData.username })
      .getOne();

    if (existsUser)
      return res.status(400).json({ message: 'Username has already exists !' });

    const userhashPassword = await hashPassword(userData.password);

    const createUser = await getRepository(Partner)
      .createQueryBuilder()
      .insert()
      .into(Partner)
      .values({
        username: userData.username,
        password: userhashPassword,
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
      })
      .returning('*')
      .execute();

    const role_id =
      (userData as any).role === UserRole.HR ? Role.HR : Role.USER;

    const insertedUser = createUser.raw[0];

    await createQueryBuilder()
      .insert()
      .into(PartnerRole)
      .values({ partner_id: insertedUser.id, role_id: role_id })
      .execute();

    const token = await generatorToken({
      ...insertedUser,
      role: (userData as any).role,
    });
    res.status(201).json({ token: token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default register;
