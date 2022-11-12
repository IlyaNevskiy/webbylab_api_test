import { NextFunction, Request, Response } from 'express';
import { INewUser } from '../shared/types';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export const isPasswordMatchedAtCreate = () => {
  return async (
    req: Request<{}, {}, INewUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, confirmPassword } = req.body;

      if (password!==confirmPassword) {
        return res
          .status(ResponseStatusCodesEnum.BAD_REQUEST)
          .json({ message: ResponseMessage.USER_BAD_PASSWORD });
      }

      next();
    } catch (err) {
      return res
        .status(ResponseStatusCodesEnum.BAD_REQUEST)
        .json({ message: ResponseMessage.USER_BAD_PASSWORD });
    }
  };
};
