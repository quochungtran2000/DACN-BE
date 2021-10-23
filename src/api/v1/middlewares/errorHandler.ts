import { NextFunction, Request, Response } from 'express';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err && err.status === 404) {
    res
      .status(err.status)
      .json({ message: 'Notfound', code: err.status, success: false });
  }
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error('Notfound!') as any;
  err.status = 404;
  next(err);
};
