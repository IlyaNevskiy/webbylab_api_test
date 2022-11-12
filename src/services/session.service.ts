import { UserModel } from '../database';import { jwtSign } from '../shared/helpers';

import { ISession } from '../shared/types';

export default class SessionService{
  public async login(user: ISession) {
    const data = await UserModel.findOne({where:{ email:user.email }});
    const token = jwtSign({ id: data!.id, email: data!.email });

    return token;
  }

}
