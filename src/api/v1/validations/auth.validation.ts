import Joi from 'joi';

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordValidation = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required(),
  confirm_password: Joi.string().required(),
});
