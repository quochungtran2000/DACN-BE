import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../validations';

export const roleHr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = (req as any)?.user?.role || UserRole.USER;
  console.log(role.tolowerCase());
  if (role.tolowerCase() == UserRole.USER)
    return res.status(400).json({ message: `You don't have permission` });
  return next();
};
