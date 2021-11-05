import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { District } from '../../entities';
import { IDistrict } from '../../interfaces';
import { PagingQueryValidation } from '../../validations';

const getDistricts = async (
  req: Request<any, any, IDistrict, any>,
  res: Response
) => {
  try {
    const cityId = req.params.cityId;
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 999;
    const skip = (page - 1) * page_size;

    const { error } = PagingQueryValidation.validate({
      page,
      page_size,
    } as any);
    if (error) res.status(404).json({ message: error.message });

    const qr = getRepository(District)
      .createQueryBuilder('ds')
      .leftJoinAndSelect('ds.city', 'ct');

    if (cityId) qr.where('ds.city_id = :city_id', { city_id: cityId });

    const [data, total] = await qr
      .take(page_size)
      .skip(skip)
      // .setParameters({ city_id: city_id })
      .getManyAndCount();

    return res
      .status(200)
      .json({ total: total, data: data, current_page: page });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getDistricts;
