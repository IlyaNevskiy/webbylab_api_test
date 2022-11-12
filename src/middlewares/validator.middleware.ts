import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export const ValidatorMiddleware = (joiSchema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.attempt(req.body, joiSchema);

      next();
    } catch (err) {
      res
        .status(ResponseStatusCodesEnum.BAD_REQUEST)
        .json({ message: ResponseMessage.BAD_REQUEST });
    }
  };
};
