import * as Joi from 'joi';

export const MovieSchema = Joi.object({
  title: Joi.string().trim().min(2).max(99).required(),
  format: Joi.string().valid('DVD','VHS', 'Blu-ray').required(),
  year: Joi.number().required().min(1850).max(2022),
  actors: Joi.array().items(Joi.string().min(2)).min(1).max(50).required()
});
