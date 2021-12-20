import { Request, Response } from 'express';
import { getRepository, ILike } from 'typeorm';
import { District, Ward } from '../../entities';
import { IDistrict } from '../../interfaces';
import { mappingDistricts, mappingWards } from '../../utils/response.mapper';
import { PagingQueryValidation } from '../../validations';

const wards = async (req: Request<any, any, any, any>, res: Response) => {
  try {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 20;
    const keyword = req.query.keyword || '';
    const skip = (page - 1) * page_size;

    const { error } = PagingQueryValidation.validate({
      page,
      page_size,
    } as any);
    if (error) res.status(404).json({ message: error.message });

    const qr = getRepository(Ward).createQueryBuilder('ds');
    if (keyword) qr.where('w.name = :keyword');
    const [data, total] = await qr
      .orderBy('district_id')
      .take(page_size)
      .skip(skip)
      .setParameters({ keyword: ILike(keyword) })
      .getManyAndCount();

    console.log(data);

    return res
      .status(200)
      .json({ total: total, data: mappingWards(data), current_page: page });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default wards;
