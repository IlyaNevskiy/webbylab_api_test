import { ResponseMessage, ResponseStatusCodesEnum, UserAuthType } from '../shared/constants';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { INewUser, ISession } from '../shared/types';
import { UserModel } from '../database';

export const isExistUserMiddleware = ( key: UserAuthType) => {
  return async (
    req: Request<{}, {}, INewUser | ISession>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await UserModel.findOne({ where:{email:req.body.email} });

      if (user && key === UserAuthType.REGISTER) {
        return res
          .status(ResponseStatusCodesEnum.BAD_REQUEST)
          .json({ message: ResponseMessage.USER_ALREADY_EXIST });
      }
      else if (!user && key === UserAuthType.LOGIN) {
        return res
          .status(ResponseStatusCodesEnum.NOT_FOUND)
          .json({ message: ResponseMessage.USER_NOT_FOUND });
      }

      next();
    } catch (err) {
      res
        .status(ResponseStatusCodesEnum.SERVER)
        .json({ message: ResponseMessage.SERVER_ERROR });
    }
  };
};
