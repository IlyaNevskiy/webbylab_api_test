import { Router } from 'express';
import { UserAuthType } from '../../shared/constants';
import { userController } from '../../controllers';
import { ControllerWrapper, isExistUserMiddleware, ValidatorMiddleware} from '../../middlewares';
import { UserSchema } from '../../shared/validators';
import { isPasswordMatchedAtCreate } from '../../middlewares';

const userRouter: Router = Router();

userRouter.post('/',
  ValidatorMiddleware(UserSchema),
  isPasswordMatchedAtCreate(),
  isExistUserMiddleware(UserAuthType.REGISTER),
  ControllerWrapper(userController.registerUser.bind(userController))
);

export default userRouter;
