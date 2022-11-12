import { config } from '../config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(ResponseStatusCodesEnum.UNAUTHORIZED)
        .json({ message: ResponseMessage.UNAUTHORIZED });
    }

    const data = verify(token, config.JWT_SECRET);

    if (!data){
      return res
        .status(ResponseStatusCodesEnum.UNAUTHORIZED)
        .json({ message: ResponseMessage.UNAUTHORIZED });
    }

    next();
  } catch (err) {
    return res
      .status(ResponseStatusCodesEnum.SERVER)
      .json({ message: (err as any).message });
  }
};
