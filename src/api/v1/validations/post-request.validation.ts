import Joi from 'joi';

export const bastPostRequestValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});
