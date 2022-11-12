import * as bcrypt from 'bcrypt';
import { UserModel } from '../database';
import { INewUser } from '../shared/types';
import { jwtSign } from '../shared/helpers';

export default class UserService{
  async createUser(user: INewUser) {
    const hashedPassword = await bcrypt.hash(user.password, 3);
    const createdUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    });
    const token = jwtSign({ id: createdUser!.id, email: createdUser!.email });

    return token;
  }
}
