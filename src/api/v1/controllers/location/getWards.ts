import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { District, Ward } from '../../entities';
import { IWard } from '../../interfaces';
import { PagingQueryValidation } from '../../validations';

const getWards = async (req: Request<any, any, IWard, any>, res: Response) => {
  try {
    const district_id = req.params.districtId;
    const city_id = req.params.cityId;
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 30;
    const skip = (page - 1) * page_size;

    const { error } = PagingQueryValidation.validate({
      page,
      page_size,
    } as any);
    if (error) res.status(404).json({ message: error.message });

    if (!(city_id || district_id))
      return res.status(404).json({ message: 'NOT FOUND' });

    const [data, total] = await getRepository(Ward)
      .createQueryBuilder('wa')
      .leftJoinAndSelect('wa.district', 'ds')
      .leftJoinAndSelect('ds.city', 'ct')
      .where('wa.district_id =:district_id', { district_id: district_id })
      .andWhere('ds.city_id =:city_id', { city_id: city_id })
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

export default getWards;
