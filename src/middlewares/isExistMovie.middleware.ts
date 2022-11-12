import { NextFunction, Request, Response } from 'express';
import { Model } from 'sequelize-typescript';
import { MovieModel, UserModel } from '../database';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export const isExistMoviesMiddleware =() => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const isExist = await MovieModel.findOne({where:{id}});

      if (!isExist) {
        return res.status(ResponseStatusCodesEnum.BAD_REQUEST).json({
          message: ResponseMessage.DATA_NOT_FOUND.replace('{id}', `${id}`)
        });
      }
      next();
    } catch (err) {
      return res
        .status(ResponseStatusCodesEnum.SERVER)
        .json({ message: ResponseMessage.SERVER_ERROR });
    }
  };
};
