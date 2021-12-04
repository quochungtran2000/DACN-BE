import Joi from 'joi';

export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr',
  USER = 'user',
}

export enum Role {
  ADMIN = 1,
  HR = 2,
  USER = 3,
}

export const basePartnerValidate = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  fullname: Joi.string().required(),
});

export const updatePartnerValidation = basePartnerValidate;

export const createPartnerValidation = basePartnerValidate.keys({
  role: Joi.string().required().valid(UserRole.HR, UserRole.USER),
});
