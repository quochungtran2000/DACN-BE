import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Post } from '../../entities/post.entity';
import { PostCategory } from '../../entities/post_category.entity';
import { PostTag } from '../../entities/post_tag.entity';
import { Tag } from '../../entities/tag.entity';
import { ICreatePost } from '../../interfaces/post.interface';
import { createPostValidation } from '../../validations';

const createPost = async (
  req: Request<any, any, ICreatePost, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: 'unauthorized' });

    const { error } = createPostValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const data = req.body;

    const result = await createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        is_public: true,
        state: 'DONE',
        slug: data.title,
        author_id: userId,
      })
      .returning('*')
      .execute();

    // const [insertPost] = result.raw;
    const id = result.identifiers[0].id;

    const categoryData = data.categories.map((item: any) => {
      return { post_id: id, category_id: item };
    });

    const tagData = data.tags.map((item: any) => {
      return { post_id: id, tag_id: item };
    });

    const createPostCategory = createQueryBuilder()
      .insert()
      .into(PostCategory)
      .values(categoryData)
      .execute();

    const createPostTag = createQueryBuilder()
      .insert()
      .into(PostTag)
      .values(tagData)
      .execute();

    Promise.all([createPostCategory, createPostTag]);

    return res.status(200).json({ message: 'Create Post Successful!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default createPost;
