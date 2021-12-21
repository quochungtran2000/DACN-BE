import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { comparePassword, hashPassword } from '../../utils/helpers';

const changePassword = async (
  req: Request<any, any, { old_password: string; new_password: string }>,
  res: Response
) => {
  try {
    const { old_password, new_password } = req.body;
    const userId = (req as any).user.id;

    const user = await getRepository(Partner)
      .createQueryBuilder()
      .where('id =:userId', { userId })
      .getOne();

    if (!user) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await comparePassword(user.password, old_password);
    if (!matchPassword)
      return res.status(400).json({ message: 'Password not match' });

    const newPassword = await hashPassword(new_password);

    await getRepository(Partner)
      .createQueryBuilder()
      .update(Partner)
      .set({ password: newPassword })
      .where('id =:userId', { userId })
      .execute();

    return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default changePassword;
