import { NextFunction, Request, Response } from 'express';

export const redirectToDashboard = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  return res.redirect('/api/v1/dashboard');
};

export const ping = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(200).json({ statusCode: 200, message: 'ping' });
};
