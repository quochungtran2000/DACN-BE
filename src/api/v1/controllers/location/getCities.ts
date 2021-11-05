import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { City } from '../../entities';
import { PagingQueryValidation } from '../../validations';

const getCities = async (req: Request<any, any, any, any>, res: Response) => {
  try {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 999;
    const skip = (page - 1) * page_size;

    const { error } = PagingQueryValidation.validate({
      page,
      page_size,
    } as any);
    if (error) res.status(404).json({ message: error.message });

    const [data, total] = await getRepository(City)
      .createQueryBuilder('city')
      .take(page_size)
      .skip(skip)
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getCities;
