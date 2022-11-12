import { sign } from 'jsonwebtoken';
import { config } from '../../config';

export const jwtSign = <T extends object | string>(payload: T) => {
  return sign(payload, config.JWT_SECRET || 'secret', { expiresIn: config.JWT_EXPIRES });
};
