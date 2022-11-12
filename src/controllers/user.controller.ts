import { Request, Response } from 'express';
import { ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';
import { UserService } from '../services';

export class UserController{
  constructor(private userService: UserService) {}

  async registerUser(req: Request,res: Response){
    const token = await this.userService.createUser(req.body);

    return res
      .status(ResponseStatusCodesEnum.CREATED)
      .json({ message: ResponseMessage.USER_CREATED, data: { token } });
  }

}

const userController = new UserController(new UserService());
export default userController;
