import { Request, Response } from 'express';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';
import SessionService from '../services/session.service';

export class SessionController{
  constructor(private sessionService: SessionService) {}

  async login(req: Request,res: Response){
    const token = await this.sessionService.login(req.body);

    return res
      .status(ResponseStatusCodesEnum.OK)
      .json({ message: ResponseMessage.NO_MESSAGE, data: { token } });
  }

}

const sessionController = new SessionController(new SessionService());
export default sessionController;
