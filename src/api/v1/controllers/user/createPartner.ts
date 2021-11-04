import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { ICreatePartner } from '../../interfaces';
import { createPartnerValidation } from '../../validations';

const createPartner = async (
  req: Request<any, any, ICreatePartner, any>,
  res: Response
) => {
  try {
    const partnerData: ICreatePartner = req.body;
    console.log(req.path);
    console.log(`request body`, req.body);
    const { error, value } = createPartnerValidation.validate(partnerData);
    console.log(error, value);
    // if(error) return res.status(400).json({ statusCode: 400, message: ''})
    // createQueryBuilder();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: '' });
  }
};

export default createPartner;
