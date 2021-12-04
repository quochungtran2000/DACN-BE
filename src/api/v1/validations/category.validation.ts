import Joi from 'joi';

export const categoryValicator = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  parent_id: Joi.number(),
});
