import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';

const createPartner = async (req: Request, res: Response) => {
  try {
    createQueryBuilder();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export default createPartner;
