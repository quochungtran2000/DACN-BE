import Joi from 'joi';

export const PagingQueryValidation = Joi.object({
  page: Joi.number().message('page must be a number'),
  page_size: Joi.number().message('page_size must be a number'),
});
