import Joi from 'joi';

export const createCommentValidation = Joi.object({
  comment: Joi.string().required(),
});
