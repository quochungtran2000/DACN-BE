import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../validations';

export const roleHr = (req: Request, res: Response, next: NextFunction) => {
  const role = (req as any)?.user?.role || UserRole.USER;
  if (role === UserRole.USER)
    return res.status(400).json({ message: `You don't have permission` });
  next();
};
