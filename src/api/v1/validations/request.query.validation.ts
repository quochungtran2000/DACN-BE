import Joi from 'joi';

export const PagingQueryValidation = Joi.object({
  page: Joi.number(),
  page_size: Joi.number(),
});
