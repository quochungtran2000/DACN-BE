import Joi from 'joi';

export const createPostValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image_url: Joi.string().required(),
  categories: Joi.array(),
  tags: Joi.array(),
});
