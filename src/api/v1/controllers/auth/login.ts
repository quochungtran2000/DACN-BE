import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { IAuthLogin } from '../../interfaces';
import { comparePassword, generatorToken } from '../../utils/helpers';
import { loginValidation } from '../../validations/auth.validation';

const login = async (
  req: Request<any, any, IAuthLogin, any>,
  res: Response
) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) res.status(404).json({ message: error.message });

    const { username, password } = req.body;
    const user = await getRepository(Partner)
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.partner_role', 'pn')
      .leftJoinAndSelect('pn.role', 'r')
      .where('a.username = :username')
      .setParameters({ username })
      .getOne();

    if (!user) return res.status(404).json({ message: 'USER NOT FOUND' });

    const { password: hashPassword, ...dataUser } = user;

    const matchPassword = await comparePassword(hashPassword, password);

    if (!matchPassword)
      return res.status(400).json({ message: 'wrong password!' });

    const role = (user as any)?.partner_role[0]?.role?.role;

    const token = await generatorToken({ ...user, role: role } as any);
    res.status(200).json({ token: token });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export default login;
