import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Partner } from '../../entities';
import { IUpdatePartner } from '../../interfaces';
import { updatePartnerValidation } from '../../validations';

const updatePartner = async (
  req: Request<any, any, IUpdatePartner, any>,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const data = req.body;
    const { error } = updatePartnerValidation.validate(data);
    if (error) return res.status(400).json({ message: error.message });

    await getRepository(Partner)
      .createQueryBuilder()
      .update(Partner)
      .set({ fullname: data.fullname, email: data.email, phone: data.phone })
      .where('id =:userId', { userId })
      .execute();

    return res.status(200).json({ message: 'update success' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default updatePartner;
