import * as Joi from 'joi';

export const SessionSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
