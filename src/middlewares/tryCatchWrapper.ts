import { NextFunction, Request, Response } from 'express';
import { ResponseStatusCodesEnum } from '../shared/constants';

type CallbackFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const ControllerWrapper = (cb: CallbackFunction) => {
  return (req: Request, res: Response, next: NextFunction) =>
    cb(req, res, next).catch((err) => {
      return res
        .status(ResponseStatusCodesEnum.SERVER)
        .json({ message: err.message});
    });
};
