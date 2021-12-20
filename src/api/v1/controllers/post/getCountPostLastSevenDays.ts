import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entities/post.entity';
// import { mappingPost } from '../../utils/response.mapper';

const getCountPostLastSevenDays = async (req: Request, res: Response) => {
  try {
    let data: any = {};
    const now = Date.now();
    for (let i = 1; i <= 7; i++) {
      const time = now - 86400000 * (7 - i);
      // const start = new Date(new Date(time).setHours(0, 0, 0, 0));
      const end = new Date(new Date(time).setHours(23, 59, 59, 999));
      const key = new Date(time).toLocaleDateString('en-GB');
      data[key] = await getRepository(Post)
        .createQueryBuilder('p')
        // .where('p.create_date > :start', { start })
        .andWhere('p.create_date < :end', { end })
        .getCount();
      console.log({ key });
      console.log(data[key]);
    }

    // const start = new Date(new Date().setHours(0, 0, 0, 0));
    // const end = new Date(new Date().setHours(23, 59, 59, 999));

    // console.log({ start });
    // console.log({ end });

    // const data = await getRepository(Post)
    //   .createQueryBuilder('pq')
    //   .where('pq.id = :id')
    //   .getCount();

    // if (!data)
    //   return res.status(400).json({ message: 'Post Request Not Found!' });

    return res.status(200).json({ data });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default getCountPostLastSevenDays;
