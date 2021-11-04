import Joi from 'joi';

export const createPartnerValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  fullname: Joi.string().required(),
});
