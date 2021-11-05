import Joi from 'joi';

export enum JobLevel {
  ALL = 'all',
  INTERN = 'itern',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  TECHLEAD = 'techlead',
}

export const createJobValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  level: Joi.string()
    .required()
    .valid(
      JobLevel.ALL,
      JobLevel.JUNIOR,
      JobLevel.INTERN,
      JobLevel.MIDDLE,
      JobLevel.SENIOR,
      JobLevel.TECHLEAD
    ),
  city_id: Joi.number().required(),
  district_id: Joi.number().required(),
  ward_id: Joi.number().required(),
  street: Joi.string().required(),
});
