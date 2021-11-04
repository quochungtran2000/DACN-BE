import Joi from 'joi';

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordValidation = Joi.object({
  old_password: Joi.string().required().min(6),
  new_password: Joi.string().required().min(6),
  confirm_password: Joi.string().required().min(6),
});
