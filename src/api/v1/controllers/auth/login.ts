import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { comparePassword, generatorToken } from '../../utils/helpers';

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getRepository(Partner).findOne({ username });

    if (!user) {
      res.status(404).json({ message: 'NOT FOUND' });
    }
    const matchPassword = await comparePassword(
      String(user?.password),
      password
    );

    if (matchPassword) {
      const token = await generatorToken(user);
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ message: 'wrong password!' });
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export default login;
