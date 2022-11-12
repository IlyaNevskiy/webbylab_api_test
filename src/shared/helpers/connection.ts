import { Sequelize } from 'sequelize-typescript';
import {MovieModel, UserModel} from '../../database';

const connection = new Sequelize({
  storage: ':memory:',
  dialect: 'sqlite',
  models: [MovieModel, UserModel]
});

export default connection;
