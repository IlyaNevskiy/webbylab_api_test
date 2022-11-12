import * as Joi from 'joi';

export const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
});
