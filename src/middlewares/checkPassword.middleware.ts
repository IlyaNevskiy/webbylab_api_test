import { NextFunction, Request, Response } from 'express';
import { ISession } from '../shared/types';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../database';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export const checkPassword = () => {
  return async (
    req: Request<{}, {}, ISession>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where:{email} });
      const isMatched = await bcrypt.compareSync(password, user!.password);

      if (!isMatched) {
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
